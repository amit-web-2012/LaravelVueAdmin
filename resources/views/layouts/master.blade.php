<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Admin Panel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app">
<div v-if="!$route.meta.requiresAuth">
    <router-view></router-view>
</div>
<div v-if="$route.meta.requiresAuth">
<div class="sidebar-mini layout-fixed">
    <div class="wrapper">
    <navbar-component></navbar-component>
    <leftmenu-component></leftmenu-component>
    <div class="content-wrapper" style="min-height: 85px;">
        <router-view></router-view>
    </div>
    </div>
</div>

</div>
</div>
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
