const shell = require('shelljs');
const prompt = require('prompt');
const colors = require("colors/safe");
const wait = require('util').promisify(setTimeout);
const fs = require('fs');
const os = require('os');
const package = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const request = require('request')

console.log('\033[2J');

title()

async function title() {
    console.log('┌─────────────────────────────────┐')
    console.log('│          ' + colors.bold(colors.rainbow('Discord Music')) + '          │')
    console.log('│                                 │')
    console.log('│           Installation          │')
    console.log('│             By Greep            │')
    console.log('└─────────────────────────────────┘')
    config();
}

async function config(){
    console.log('\n# Creating configuration:')
    await wait(1000);

    fs.access('./config.json', fs.constants.F_OK, (err) => {
        if (!err) {
            console.log(colors.yellow(`Config file exists!`));
        }
    });

    await wait(1000);

    var schema = {
        properties: {
          token: {
            description: colors.white(colors.underline('Enter your Discord bot token') + colors.grey(' (https://discordapp.com/developers):')),
            type: 'string',
            required: true,
            message: colors.red('Please enter your Discord bot token')
          },
          prefix: {
            description: colors.white(colors.underline('Enter your prefix: ')),
            type: 'string',
            required: true,
            message: colors.red('Please enter your prefix'),
            default: 'm!'
          }
        }
    };
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();
    prompt.get(schema, function (err, result) {
        var array = {
            "token" : result.token,
            "prefix": result.prefix
        };
        var array_file = JSON.stringify(array).split(',').join(',\n    ')
        array_file = array_file.replace('{', '{\n    ').replace('}', '\n}')
        fs.writeFile('./config.json', array_file, async function(x){
            if (x) {
                console.error(colors.red('----- ERROR: ------'))
                console.error(`We\'re unable to create config data`)
                console.error('Details:')
                console.error(x)
                console.error(colors.red('-------------------'))
                process.exit(11)
            } else {
                console.log(colors.green('Sucess!'))
                end()
            }
        });
    });
}

async function end(){
    await wait(2000)

    console.log('\n')
    console.log(colors.rainbow('┌─────────────────────────────────┐'))
    console.log(colors.rainbow('|            ✅ Done! ✅          |'))
    console.log(colors.rainbow('└─────────────────────────────────┘'))
    console.log('')
    console.log('Installation finished! Thanks for your patience')

    console.log('or just with node: ' + colors.blue('node index.js'))
    console.log(colors.green('\nThanks for using my music bot 💙'))
    console.log('')
    process.exit(0)
}
