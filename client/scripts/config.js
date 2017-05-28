Handlebars.registerPartial('header',
    `<header class="mdl-layout__header forum-header">
    <div class="mdl-layout-icon"></div>
    <div class="mdl-layout__header-row">
        <span class="mdl-layout__title forum-header__title">
            <a href="/"><img src="../assets/img/logo.png"></img></a>
        </span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation forum-header__navigation">
            {{#if currentUser}}
            <a class="mdl-navigation__link forum-header__navigation-user" href="#/profiles/{{currentUser}}">{{currentUser}}</a>
            <a class="mdl-navigation__link forum-header__navigation-logout" href="#/logout">Logout</a>
            <a class="mdl-navigation__link hidden forum-header__navigation-login" href="#/login">Login</a>
            <a class="mdl-navigation__link hidden forum-header__navigation-register" href="#/register">Register</a>
            {{else}}
            <a class="mdl-navigation__link hidden forum-header__navigation-logout" href="#/logout">Logout</a>
            <a class="mdl-navigation__link forum-header__navigation-login" href="#/login">Login</a>
            <a class="mdl-navigation__link forum-header__navigation-register" href="#/register">Register</a> 
            {{/if}}
        </nav>
    </div>
</header>`);


Handlebars.registerPartial('drawer',
    `<div class="mdl-layout__drawer mdl-layout--small-screen-only forum-drawer"></div>`);


Handlebars.registerPartial('footer',
    `<footer class="mdl-mini-footer forum-footer">
        <div class="mdl-mini-footer__left-section">
            <div class="mdl-logo">
                <img src="../assets/img/logo.png"></img>
            </div>
        </div>
        <div class="mdl-mini-footer__right-section">
            <ul class="mdl-mini-footer__link-list">
                <li><a href="">Help</a></li>
                <li><a href="">Privacy & Terms</a></li>
            </ul>
        </div>
    </footer>`);

Handlebars.registerHelper('userfriendlyDate', function (date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return date.toLocaleString();
});