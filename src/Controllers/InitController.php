<?php

namespace App\Controllers;

use App\Helpers\JournalConfiguration;
use App\Helpers\TokenHelper;
use Nacho\Controllers\AbstractController;
use Nacho\Security\JsonUserHandler;

class InitController extends AbstractController
{
    const NO_TOKEN_SET = 'no_token_set';
    const TOKEN_VALID = 'token_valid';
    const TOKEN_INVALID = 'token_invalid';

    public function init(): string
    {
        $isTokenValid = $this->isTokenValid();

        $year = JournalConfiguration::year();

        $isAdminCreated = $this->isAdminCreated();

        return $this->json(['is_token_valid' => $isTokenValid, 'journalYear' => $year, 'adminCreated' => $isAdminCreated]);
    }

    private function isTokenValid(): string
    {
        if (!key_exists('token', $_REQUEST)) {
            return self::NO_TOKEN_SET;
        }

        $tokenHelper = new TokenHelper();

        $users = $this->nacho->userHandler->getUsers();

        if ($tokenHelper->isTokenValid($_REQUEST['token'], $users)) {
            return self::TOKEN_VALID;
        }

        return self::TOKEN_INVALID;
    }

    private function isAdminCreated(): bool
    {
        $userHandler = new JsonUserHandler();
        $users = $userHandler->getUsers();
        foreach ($users as $user) {
            if ($user['role'] === 'Editor') {
                return true;
            }
        }

        return false;
    }
}