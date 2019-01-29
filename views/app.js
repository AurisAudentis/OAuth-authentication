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
        const url = "http://" + window.location.host;
        $.post({
            url: url + "/oauth/sso/login",
            data: {mail:mail, pw:pw}
        })
        .done((resp) => resp.success ? redirect(resp):error(resp))
    }

    function redirect(resp) {
        window.location.href = resp.url;
    }

    function error(resp) {

    }
});