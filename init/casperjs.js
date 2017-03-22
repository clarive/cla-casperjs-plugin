var reg = require("cla/reg");

reg.register('service.casperjs.script', {
    name: 'Run CasperJS Code',
    icon: '/plugin/cla-casperjs-plugin/icon/casperjs.svg',
    form: '/plugin/cla-casperjs-plugin/form/casperjs-form.js',
    handler: function(ctx, config) {

        var log = require('cla/log');
        var ci = require('cla/ci');

        var filePath = config.file_path || '';
        var casperArgs = config.casper_args || '';
        var scriptArgs = config.script_args || '';
        var test = (config.is_test) ? "test" : "";
        var expectStart = "expect -c 'set timeout -1' -c 'spawn casperjs " + casperArgs + " " + test + " ";
        var expectEnd = " " + scriptArgs + "' -c 'expect " + '"Error: "' + " {exit 1}'  -c 'lassign [wait] pid spawnid os_error_flag value' -c 'exit $value'";

        var serverCheck = ci.findOne({
            mid: config.server + ''
        });
        if (!serverCheck){
            log.fatal("Generic server CI doesn't exist");
        }

        var server = ci.load(config.server);
        var agent = server.connect();
        agent.execute(expectStart + filePath + expectEnd);

        var response = agent.tuple().output;
        if (agent.tuple().rc) {
            log.error("Error. ", response);
            throw new Error("Error. " + response);
        }

        log.info("Script finished. ", response);
    }
});