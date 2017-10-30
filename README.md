
# CasperJS plugin

CasperJS plugin will allow you to launch PhantomJS and CasperJS scripts from Clarive's instance.

## What is CasperJS

CasperJS is a browser navigation scripting & testing utility written in Javascript for PhantomJS or SlimerJS.

CasperJS allows you to build full navigation scenarios using high-level functions and a straight forward interface to accomplish all sizes of tasks.

CasperJS comes with a basic testing suite that allows you to run full featured tests without the overhead of a full browser.
Output the tests to xunit for long term code health as well.

Capture data from web pages simply that don't contain APIs. Validate your production environment on a regular basis. 
Alternatively, use this to load your application with data.

## Requirements

This plugin requires CasperJS and PhantomJS to be installed in the instance to work properly.

To install PhantomJS you need to click [here](http://phantomjs.org/download.html) and follow the instructions.

To install CasperJS you need to click [here](http://docs.casperjs.org/en/latest/installation.html#installing-from-git) and follow the instructions.

If you are going to run on a remote server, check the server to have both requeriments mentioned above plus [`Expect`](http://expect.sourceforge.net/) installed

## Installing

To install the plugin place the cla-casperjs-plugin folder inside `CLARIVE_BASE/plugins`
directory in Clarive's instance.

## Using CasperJS

Once the plugin is placed in its folder and Clarive is restarted, you can start using it going to your Clarive's
instance.

You will have now one new rule palette service called "Run CasperJS code":

### Run CasperJS Code

This palette service will allow you to choose an already existing phantom or casper js file on the server you select, and be able to set arguments for the script or for the CasperJS command.

- **Server**- This option let you choose the server where you want to execute the code. 
- **Running a test?**- Check this option if you are running a CasperJS test.
- **File path**- Write the path where the script file is located. It must be the full path to the file.
- **CasperJS arguments**- Fill this if you want to send arguments to CasperJS. For more than one argument you must separate them by white spaces.
- **Script arguments**- Fill this if you want to send arguments to the script. For more than one argument you must separate them by white spaces.

Configuration example:

	Server: Clarive_server
    Running a test?: true
    File path: /opt/clarive/examples/casperTest.js
    CasperJS arguments: 
    Script arguments: arg1 arg2

The service will return the console output for the command.

## Variables:

In order to use some comboboxes or texfields options from some services, you will need to use variables created in the Variable Resource from Clarive so you can use them more time on an easier way than repeating it every time.

There are different Variables types (value, CI, textArea, array, etc), all of the in the Resource Variable. The CI type is usefull for the ciComboBoxes, as you will not be able to manually write them into the combobox, but yes in the texfields.

The CI variable should be created with the following parameters:

- **Type -** CI.
- **CI Role -** Select the Role of the CI class you have in the comboBox. 
- **CI CLASS -** Select the specific CI Class it will use, usually the same class as the comboBox where you want to make it appear.

## Common errors

Here we will explain some errors that you can have and how to try to fix them.

If you get the message "Generic server CI doesn't exist".
Choose a server which has all the requiriments specified so the command can be executed.

If you get an error message when launching the service, maybe your code or aguments are wrong, or check if you are executing a code for test or not,
 so you will need to check or uncheck the *Running a test?* box.

Also check your File path is correct so the program system can find it.
