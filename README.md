# CasperJS plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-casperjs-plugin@master/public/icon/casperjs.svg?sanitize=true" alt="CasperJS Plugin" title="CasperJS Plugin" width="120" height="120">

CasperJS plugin will allow you to launch PhantonJS and CasperJS scripts from Clarive's instance.

## What is CasperJS

CasperJS is a browser navigation scripting & testing utility written in Javascript for PhantomJS or SlimerJS.

CasperJS allows you to build full navigation scenarios using high-level functions and a straight forward interface to accomplish all sizes of tasks.

CasperJS comes with a basic testing suite that allows you to run full featured tests without the overhead of a full browser.
Output the tests to xunit for long term code health as well.

Capture data from web pages simply that don't contain APIs. Validate your production environment on a regular basis. 
Alternatively, use this to load your application with data.

## Requirements

This plugin requires CasperJS and PhantomJS to be installed in the instance to work properly.

To install PhantomJS click [here](http://phantomjs.org/download.html) and follow the instructions.

To install CasperJS click [here](http://docs.casperjs.org/en/latest/installation.html#installing-from-git) and follow the instructions.

If you are going to run on a remote server, check the server to have both requeriments mentioned above plus [`Expect`](http://expect.sourceforge.net/) installed

## Installing

To install the plugin place the cla-casperjs-plugin folder inside `$CLARIVE_BASE/plugins`
directory in Clarive's instance.

### Run CasperJS Code

The various parameters are:

- **Server (parameter name: server)**- This option let you choose the server where you want to execute the code. 
- **User (user)**- User which will be used to connect to the server.
- **Running a test? (is_test)**- Check this option if you are running a CasperJS test.
- **File path (file_path)**- Write the path where the script file is located. It must be the full path to the file.
- **CasperJS arguments (casper_args)**- Fill this if you want to send arguments to CasperJS. For more than one argument you must separate them by white spaces.
- **Script arguments (script_args)**- Fill this if you want to send arguments to the script. For more than one argument you must separate them by white spaces.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Run CasperJS Code**

Example:

```yaml
    Server: CasperJS server
    Running a test?: true
    File path: /full/path/to/casperTest.js
    CasperJS arguments: 
    Script arguments: arg1 arg2
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: CasperJS demo
do:
   - myvar = casper_script:
       server: casperjs_server   		# Required. Use the mid set to the resource you created
       user: 'casper_user'
       file_path: '/full/path/to/casperTest.js'	# Required
       is_test: "0"    				# Required
       script_args: ['arg1', 'arg2']
   - echo: ${myvar}
```

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

If you get the message "Generic server Resource doesn't exist".
Choose a server which has all the requiriments specified so the command can be executed.

If you get an error message when launching the service, maybe your code or aguments are wrong, or check if you are executing a code for test or not,
 so you will need to check or uncheck the *Running a test?* box.

Also check your File path is correct so the program system can find it.

**Parameter required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "casper_script": "file_path"
```

Make sure you have all required parameters defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "casper_script"
```

Make sure you are using the correct paramaters (make sure you are writing the parameters names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
