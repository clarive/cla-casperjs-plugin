var reg = require("cla/reg");

reg.register('service.casperjs.script', {
    name: _('Run CasperJS Code'),
    icon: '/plugin/cla-casperjs-plugin/icon/casperjs.svg',
    form: '/plugin/cla-casperjs-plugin/form/casperjs-form.js',
    rulebook: {
        moniker: 'casper_script',
        description: _('Launch CarperJS scripts'),
        required: [ 'server', 'file_path', 'is_test'],
        allow: ['server', 'file_path', 'is_test', 'script_args', 'casper_args'],
        examples: [{
            casper_script: {
                server: 'casper_server',
                file_path: '/scripts/script.js',
                is_test: '1',
                script_args: ['arg1', 'arg2']
            }
        }]
    },
    handler: function(ctx, config) {

        var log = require('cla/log');
        var ci = require('cla/ci');

        var filePath = config.file_path || '';
        var casperArgs = config.casper_args || '';
        var scriptArgs = config.script_args;
        var test = (config.is_test) ? "test" : "";
        var expectStart = "expect -c 'set timeout -1' -c 'spawn casperjs " + casperArgs + " " + test + " ";
        var expectEnd = " " + scriptArgs.join(" ") + "' -c 'expect " + '"Error: "' + " {exit 1}'  -c 'lassign [wait] pid spawnid os_error_flag value' -c 'exit $value'";

        var serverCheck = ci.findOne({
            mid: config.server + ''
        });
        if (!serverCheck){
            log.fatal(_("Generic server CI doesn't exist"));
        }

        var server = ci.load(config.server);
        var agent = server.connect();
        agent.execute(expectStart + filePath + expectEnd);

        var response = agent.tuple().output;
        if (agent.tuple().rc) {
            log.fatal(_("Error. "), response);
        }

        log.info(_("Script finished. "), response);
    }
});