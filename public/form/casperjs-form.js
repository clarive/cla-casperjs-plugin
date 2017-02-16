(function(params) {

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: params.data.server || '',
        class: 'generic_server',
        fieldLabel: _('Select server'),
        allowBlank: false
    });

    var testCheckBox = Cla.ui.checkBox({
        name: 'is_test',
        fieldLabel: _('Running a test?'),
        checked: params.data.is_test || false
    });

    var pathTextField = Cla.ui.textField({
        name: 'file_path',
        fieldLabel: _('File path'),
        value: params.data.file_path || '',
        allowBlank: false
    });

    var caperArgsTextField = Cla.ui.textField({
        name: 'casper_args',
        fieldLabel: _('CasperJS arguments'),
        value: params.data.casper_args || ''
    });

    var scriptArgsTextField = Cla.ui.textField({
        name: 'script_args',
        fieldLabel: _('Script arguments'),
        value: params.data.script_args || ''
    });

    return [
        serverCombo,
        testCheckBox,
        pathTextField,
        caperArgsTextField,
        scriptArgsTextField
    ]
})