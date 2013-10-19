<?php

//define production host
$productionHosts = array
(
    'zbierak20.devfuze.com'
);

if ( !defined('ENVIRONMENT') and in_array($_SERVER['HTTP_HOST'], $productionHosts))
{
    define('ENVIRONMENT', 'production');
}
else
{
    define('ENVIRONMENT', 'development');
}

if ('production' == ENVIRONMENT)
{
    // production
    define('DOMAIN', 'zbierak20.devfuze.com');
    define('APP_URL', 'http://zbierak20.devfuze.com/');
    define('PROTOCOL', 'http');
    define('IMAGES_URL', 'http://static.zbierak.com/images/static/');
    define('CDN_URL', 'http://zbierak20.devfuze.com/');
}
else
{
    // development
    define('DOMAIN', 'zbierak20.new');
    define('APP_URL', 'http://zbierak20.new/');
    define('PROTOCOL', 'http');
    define('IMAGES_URL', 'http://zbierak20.new/devel/');
    define('CDN_URL', 'http://zbierak20.new/');
}
