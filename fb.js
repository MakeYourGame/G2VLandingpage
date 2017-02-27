var Facebook =
{
    appID:          694259143968956,
    testAppID:      694272240634313,
    test:           false,
    loginPage:      '/FacebookLogin',
    accessToken:    false,

    init: function ()
    {
        // Additional JS functions here
        window.fbAsyncInit = function() {
            FB.init({
                appId      : !Facebook.test ? Facebook.appID : Facebook.testAppID, // App ID
                channelUrl : '//www.makeyourgame.net/fbchannel.html', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });


            /*
             FB.Event.subscribe('auth.authResponseChange', function(response) {
             if (response.status === 'connected') {
             //log(response);
             Facebook.testAPI();
             } else if (response.status === 'not_authorized') {
             FB.login();
             } else {
             FB.login();
             }
             });
             */

        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/de_DE/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $(document).ready(function () {
            $('.fbLogin').click(function() {
                Facebook.login();
            });
        });
    },

    testAPI: function ()
    {
        log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            log('Good to see you, ' + response.name + '.');
        });
    },

    login: function ()
    {
        if (this.status() != 'connected') {
            FB.login(
                function(response) {
                    if (response.status == "connected") {
                        window.location.href = Facebook.loginPage;
                    }
                },
                {scope: 'email'}
            );
        }
        else {
            window.location.href = Facebook.loginPage;
        }
    },

    logout: function ()
    {
        if (this.loggedIn()) {
            FB.logout(function (response) {
                //Do what ever you want here when logged out like reloading the page
                log('Facebook logout done!');
            });
        }
        else {
            log('Not logged in to Facebook!');
        }
    },

    status: function ()
    {
        var s;
        FB.getLoginStatus(function(response) {
            s = response.status;
        });

        return s;
    },

    loggedIn: function ()
    {
        return (in_array(this.status(), ['connected','not_authorized']));
    }
};

Facebook.init();