$(() => {
    const $mailField = $("#email");
    const $pwField = $("#pw");
    const $submButton = $("#sbmt");
    $submButton.click(submit);
    function submit() {
        const mail = $mailField.val();
        const pw = $pwField.val();
        sendRequest(mail, pw);
    }



    function sendRequest(mail, pw) {
        const url = "https://" + window.location.host;
        $.post({
            url: url + "/oauth/sso/login",
            data: {mail:mail, pw:pw}
        })
        .done((resp) => resp.success ? redirect(resp, url):error(resp))
    }

    function redirect(resp, url) {
        const params = new URLSearchParams(window.location.search);
        window.location.href = url + "/oauth/sso/getToken?redirect=" + params.get("redirect");
    }

    function error(resp) {

    }
});