'use strict';

const config = require('./config/config');

const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
//const logger = require('./lib/log4js').getLogger('cli');
const models = require('./models');

const argsDefinitions = [
    {
        name: 'queue',
        type: String,
        description: 'Task queue name'
    },
    {
        name: 'body',
        type: JSON.parse,
        typeLabel: '[underline]{json}',
        defaultOption: true,
        description: 'Task queue message'
    },
    {
        name: 'node',
        alias: 'n',
        type: Number,
        description: '[Optional] Node ID for handling this task'
    },
    {
        name: 'priority',
        alias: 'p',
        type: Number,
        description: '[Optional] Task priority'
    },
    {
        name: 'help',
        type: Boolean,
        description: 'Print this usage guide'
    }
];

const usageDefinitions = [
    {
        header: 'Node Daemons',
        content: 'Command Line Interface to Node Daemons.'
    },
    {
        header: 'Options',
        optionList: argsDefinitions
    }
];

let options = {};
try {
    options = commandLineArgs(argsDefinitions);

    if (options.help || _.size(options) == 0) {
        console.log(commandLineUsage(usageDefinitions));
    }
} catch (error) {
    console.error('Cannot parse console arguments: ' + error.message, error);
}

models.sequelize.close();
