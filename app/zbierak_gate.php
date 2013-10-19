<?php
include('../config/config.php');

if ('development' == ENVIRONMENT)
{   
    echo '{
            "results":
            [';
            if (1 == $_GET['actual_page']) 
            {
                echo '{"id":"1","full_file_info":"cartoon-art01.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},

                {"id":"30","full_file_info":"1868746898.gif","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"31","full_file_info":"1918237776.jpeg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"32","full_file_info":"5489077983.gif","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                
                {"id":"2","full_file_info":"cartoon-art02.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"3","full_file_info":"cartoon-art03.jpg","desc":"cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"4","full_file_info":"cartoon-art04.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"5","full_file_info":"cartoon-art05.jpg","desc":"","created_on":"2013-09-23 11:01:55"}';
            }
            else if (2 == $_GET['actual_page'])
            {
                echo '{"id":"9","full_file_info":"cartoon-art09.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"10","full_file_info":"cartoon-art10.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"11","full_file_info":"cartoon-art11.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"12","full_file_info":"cartoon-art12.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"13","full_file_info":"cartoon-art13.jpg","desc":"cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"14","full_file_info":"cartoon-art14.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"15","full_file_info":"cartoon-art15.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"16","full_file_info":"cartoon-art16.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"}';
            }
            else if (3 == $_GET['actual_page'])
            {
                echo '{"id":"17","full_file_info":"cartoon-art17.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"18","full_file_info":"cartoon-art18.jpg","desc":"cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"19","full_file_info":"cartoon-art19.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"20","full_file_info":"cartoon-art20.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"21","full_file_info":"cartoon-art21.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"22","full_file_info":"cartoon-art22.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"23","full_file_info":"cartoon-art23.jpg","desc":"cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"24","full_file_info":"cartoon-art24.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"}';
            }
            else if (4 == $_GET['actual_page'])
            {
                echo '{"id":"25","full_file_info":"cartoon-art25.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"26","full_file_info":"cartoon-art26.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"27","full_file_info":"cartoon-art27.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"28","full_file_info":"cartoon-art28.jpg","desc":"cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"29","full_file_info":"cartoon-art29.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"30","full_file_info":"cartoon-art30.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"6","full_file_info":"cartoon-art06.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"7","full_file_info":"cartoon-art07.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"}';
            }
            else if (40 < $_GET['actual_page'])
            {
                echo '{"id":"40","full_file_info":"cartoon-art25.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"41","full_file_info":"cartoon-art26.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"42","full_file_info":"cartoon-art27.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"},
                {"id":"43","full_file_info":"cartoon-art28.jpg","desc":"cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"44","full_file_info":"cartoon-art29.jpg","desc":"consectetur adipiscing elitcartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"45","full_file_info":"cartoon-art30.jpg","desc":"","created_on":"2013-09-23 11:01:55"},
                {"id":"46","full_file_info":"cartoon-art06.jpg","desc":"lorem ipsum cartoon-art","created_on":"2013-09-23 11:01:55"},
                {"id":"47","full_file_info":"cartoon-art07.jpg","desc":"cartoon-art, dolor sit amet, ipsum adipiscing sit amet","created_on":"2013-09-23 11:01:55"}';
            }
            echo '],
            "rows":1815,
            "current_page":1,
            "max_records":20}
        ';

    die;
}



$get = '';
if ( !empty($_GET))
{
    $implodedParamValue = array();
    foreach ($_GET as $key => $value)
    {
        $implodedParamValue[] = $key . "=" . $value;
    }
    $get = '?' . implode($implodedParamValue, '&');
}

// get content
$content = file_get_contents('http://www.zbierak.com/' . $get);

// make some str replace to reroute requests
$content = preg_replace('/^zbierak.com(?!\/css|js)$/', 'zbierak20.devfuze.com/zbierak_gate.php', $content);

echo $content;