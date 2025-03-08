<?php

namespace App\Controller;

use Nacho\Controllers\AbstractController;
use Nacho\Models\HttpResponse;
use PixlMint\JournalPlugin\Helpers\CacheHelper;

class JournalFrontendController extends AbstractController
{
    public function index(CacheHelper $cacheHelper): HttpResponse
    {
        $cacheHelper->build();
        $entries = $cacheHelper->read();

        return $this->render('base.twig', ['pages' => array_values($entries->getContent())]);
    }
}

