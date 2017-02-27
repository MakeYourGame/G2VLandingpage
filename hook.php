<?php
/**
 * This page receives a hook from github and executes a git pull.
 * 
 * 
 * @link https://github.com/kossa/autodeploy-github-bitbucket
 */

function execAndPrint($cmd, $servername)
{
    chdir(dirname(__DIR__));
    $output = [];
    $returnVar = null;
    exec($cmd, $output, $returnVar);
    if ($returnVar > 0) {
        error_log(join(PHP_EOL, $output));
        $msg = "Deploy failed on " . $servername;
        http_response_code(500);
    } else {
        $output = join(" ", $output);
        if (strpos($output, "Already up-to-date.")) {
            $msg = null;
        } else {
            $msg = "Deploy successful on " . $servername;
        }
    }
    
    echo $msg;
}

if (!empty($_POST)) {// if we have a post request from Github or Bitbucket
    execAndPrint("git pull -f", $_SERVER['SERVER_NAME']);
}

