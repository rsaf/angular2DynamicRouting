<!DOCTYPE html>
<html>
<head lang="en">
    <!--angular route config base-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0 user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <title>Gineign Admin</title>

    <link rel="stylesheet" type="text/css" href="/assets/shop/css/lib.min.css">

    <link rel="stylesheet" type="text/css" href="/assets/shop/css/admin.min.css">

    <script type="text/javascript" src="/assets/shop/js/lib.min.js"></script>
    <script type="text/javascript" src="/assets/shop/js/angular.min.js"></script>
    <!-- 2. Configure SystemJS -->
    <script>
        System.config({
            packages: {
                '/assets/shop/admin': {
                    format: 'register',
                    defaultExtension: 'js'
                },
            },
        });
        System.import('/assets/shop/admin/boot')
                .then(null, console.error.bind(console));
    </script>
</head>
<base href="/shop/admin">
<body>
<admin>
    <!-- Start Page Loading -->
    <div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div>
</admin>
</body>
</html>
