var reg = require("cla/reg");

reg.register('service.casperjs.script', {
    name: _('Run CasperJS Code'),
    icon: '/plugin/cla-casperjs-plugin/icon/casperjs.svg',
    form: '/plugin/cla-casperjs-plugin/form/casperjs-form.js',
    rulebook: {
        moniker: 'casper_script',
        description: _('Launch CarperJS scripts'),
        required: [ 'server', 'file_path', 'is_test'],
        allow: ['server', 'user', 'file_path', 'is_test', 'script_args', 'casper_args'],
        examples: [{
            casper_script: {
                server: 'casper_server',
                user: 'casper_user',
                file_path: '/scripts/script.js',
                is_test: '1',
                script_args: ['arg1', 'arg2']
            }
        }]
    },
    handler: function(ctx, config) {

        var log = require('cla/log');
        var reg = require('cla/reg');
        var ci = require('cla/ci');

        var server = config.server;
        var filePath = config.file_path || '';
        var casperArgs = config.casper_args || '';
        var scriptArgs = config.script_args || [];
        var test = (config.is_test == '1' || config.is_test == true) ? "test" : "";
        var user = config.user || "";
        var errors = config.errors || 'fail';
        var fullCommand = "";
        var expectStart = "expect -c 'set timeout -1' -c 'spawn casperjs " + casperArgs + " " + test + " ";
        var expectEnd = " " + scriptArgs.join(" ") + "' -c 'expect " + '"Error: "' + " {exit 1}'  -c 'lassign [wait] pid spawnid os_error_flag value' -c 'exit $value'";

        var serverCheck = ci.findOne({
            mid: server + ''
        });
        if (!serverCheck){
            log.fatal(_("Generic server Resource doesn't exist"));
        }

        function remoteCommand(config, command, server, errors, user) {
            var output = reg.launch('service.scripting.remote', {
                name: _('CasperJS script'),
                config: {
                    errors: errors,
                    server: server,
                    user: user,
                    path: command,
                    output_error: config.output_error,
                    output_warn: config.output_warn,
                    output_capture: config.output_capture,
                    output_ok: config.output_ok,
                    meta: config.meta,
                    rc_ok: config.rcOk,
                    rc_error: config.rcError,
                    rc_warn: config.rcWarn
                }
            });
            return output;
        }

        fullCommand = expectStart + filePath + expectEnd;

        log.info(_("Starting CasperJS script"));
        var response = remoteCommand(config, fullCommand, server, errors, user);
        log.info(_("CasperJS script finished"), response.output);
        return response.output;
    }
});