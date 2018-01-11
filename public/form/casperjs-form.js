(function(params) {

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: params.data.server || '',
        role: 'Server',
        fieldLabel: _('Select server'),
        allowBlank: false,
        with_vars: 1
    });

    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: params.data.user || '',
        allowBlank: true
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

    var scriptArgsTextField = Cla.ui.arrayGrid({
        name: 'script_args',
        fieldLabel: _('Script arguments'),
        value: params.data.script_args,
        description: _('Script arguments'),
        default_value: '.'
    });

    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: params.data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: params.data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: params.data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: params.data.rcError,
        errorTabsValue: params.data
    })


    return [
        serverCombo,
        userTextField,
        testCheckBox,
        pathTextField,
        caperArgsTextField,
        scriptArgsTextField,
        errorBox
    ]
})