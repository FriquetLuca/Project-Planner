let DEFAULT_LANGUAGE = 'en';
let TASK_ID = 0;
let userTasks = [];
let dark = false;
const TASK_QUERY = [
    '.toDo_tasks > .task',
    '.doing_tasks > .task',
    '.done_tasks > .task'
];
const TASK_QUERY_C = [
    '.toDo_tasks',
    '.doing_tasks',
    '.done_tasks'
];
const ALL_PRIORITY = [
    'high',
    'medium',
    'low'
];
const LANGUAGE_DB = {
    'en': {
        'NEW_TASK_INPUT': {
            name: 'Name:',
            priority: 'Priority:',
            pLow: 'Low',
            pMed: 'Medium',
            pHigh: 'High',
            description: 'Description:',
            dueTo: 'Due to:',
            post: 'Post task'
        },
        'SORT_INPUT': {
            category: 'Sort',
            prop0: 'Name',
            prop1: 'Priority',
            prop2: 'Deadline'
        },
        'FILTER_INPUT': {
            category: 'Filter',
            prop0: 'To do',
            prop1: 'In progress',
            prop2: 'Finished',
            nTask: 'New task'
        },
        'THEME_INPUT': {
            category: 'Dark mode',
            opposite: 'Light mode'
        },
        'LANGUAGE_INPUT': {
            name: 'Language :',
            list: [
                {key: 'English', value: 'en', default: true},
                {key: 'French', value: 'fr'},
                {key: 'German', value: 'ge'},
                {key: 'Dutch', value: 'du'}
            ]
        },
        'DATE_WRITE': (days) => {
            if(days > 1)
            {
                return `In ${days} days.`;
            }
            else if(days == 1)
            {
                return `Tomorrow.`;
            }
            else if(days == 0)
            {
                return `Today.`;
            }
            else if(days == -1)
            {
                return `Yesterday.`;
            }
            return `${Math.abs(days)} days late.`;
        },
        'NAME_ERROR': 'There must be at least two characters in the name.',
        'DESC_ERROR': 'There must be at least one character in the description.'
    },
    'fr': {
        'NEW_TASK_INPUT': {
            name: 'Nom :',
            priority: 'Priorit?? :',
            pLow: 'Basse',
            pMed: 'Moyenne',
            pHigh: 'Haute',
            description: 'Description :',
            dueTo: '?? remettre au:',
            post: 'Poster la t??che'
        },
        'SORT_INPUT': {
            category: 'Trier',
            prop0: 'Nom',
            prop1: 'Priorit??',
            prop2: 'Date de remise'
        },
        'FILTER_INPUT': {
            category: 'Filtre',
            prop0: '?? faire',
            prop1: 'En cours',
            prop2: 'Termin??',
            nTask: 'Nouvelle t??che'
        },
        'THEME_INPUT': {
            category: 'Mode sombre',
            opposite: 'Mode claire'
        },
        'LANGUAGE_INPUT': {
            name: 'Langue :',
            list: [
                {key: 'Anglais', value: 'en'},
                {key: 'Fran??ais', value: 'fr', default: true},
                {key: 'Allemand', value: 'ge'},
                {key: 'N??erlandais', value: 'du'}
            ]
        },
        'DATE_WRITE': (days) => {
            if(days > 1)
            {
                return `Dans ${days} jours.`;
            }
            else if(days == 1)
            {
                return `Demain.`;
            }
            else if(days == 0)
            {
                return `Aujourd'hui.`;
            }
            else if(days == -1)
            {
                return `Hier.`;
            }
            return `${Math.abs(days)} jours de retard.`;
        },
        'NAME_ERROR': 'Le nom doit contenir au minimum deux caract??res.',
        'DESC_ERROR': 'Il doit y avoir au minimum un caract??re dans la description.'
    },
    'ge': {
        'NEW_TASK_INPUT': {
            name: 'Name:',
            priority: 'Priorit??t:',
            pLow: 'Niedrig',
            pMed: 'Mittel',
            pHigh: 'Hoch',
            description: 'Beschreibung:',
            dueTo: 'Datum der Abgabe:',
            post: 'Aufgabe posten'
        },
        'SORT_INPUT': {
            category: 'Sortieren',
            prop0: 'Name',
            prop1: 'Priorit??t',
            prop2: 'Frist'
        },
        'FILTER_INPUT': {
            category: 'Filter',
            prop0: 'Zu tun',
            prop1: 'Tun',
            prop2: 'Erledigt',
            nTask: 'Neue Aufgabe'
        },
        'THEME_INPUT': {
            category: 'Dunkler modus',
            opposite: 'Licht modus'
        },
        'LANGUAGE_INPUT': {
            name: 'Sprache:',
            list: [
                {key: 'Englisch', value: 'en'},
                {key: 'Franz??sisch', value: 'fr'},
                {key: 'Deutsch', value: 'ge', default: true},
                {key: 'Holl??ndisch', value: 'du'}
            ]
        },
        'DATE_WRITE': (days) => {
            if(days > 1)
            {
                return `In ${days} tagen.`;
            }
            else if(days == 1)
            {
                return `Morgen.`;
            }
            else if(days == 0)
            {
                return `Heute.`;
            }
            else if(days == -1)
            {
                return `Gestern.`;
            }
            return `${Math.abs(days)} tage sp??t.`;
        },
        'NAME_ERROR': 'Der Name muss aus mindestens zwei Zeichen bestehen.',
        'DESC_ERROR': 'Die Beschreibung muss mindestens ein Zeichen enthalten.'
    },
    'du': {
        'NEW_TASK_INPUT': {
            name: 'Naam:',
            priority: 'Prioriteit:',
            pLow: 'Lage',
            pMed: 'Gemiddelde',
            pHigh: 'Hoge',
            description: 'Beschrijving:',
            dueTo: 'In te dienen bij:',
            post: 'Posttaak'
        },
        'SORT_INPUT': {
            category: 'Sortieren',
            prop0: 'Naam',
            prop1: 'Prioriteit',
            prop2: 'Uiterste datum'
        },
        'FILTER_INPUT': {
            category: 'Filter',
            prop0: 'Te doen',
            prop1: 'In uitvoering',
            prop2: 'Gedaan',
            nTask: 'Nieuwe taak'
        },
        'THEME_INPUT': {
            category: 'Donkere modus',
            opposite: 'Licht modus'
        },
        'LANGUAGE_INPUT': {
            name: 'Taal:',
            list: [
                {key: 'Engels', value: 'en'},
                {key: 'Frans', value: 'fr'},
                {key: 'Duits', value: 'ge'},
                {key: 'Nederlands', value: 'du', default: true}
            ]
        },
        'DATE_WRITE': (days) => {
            if(days > 1)
            {
                return `Over ${days} dagen.`;
            }
            else if(days == 1)
            {
                return `Morgen.`;
            }
            else if(days == 0)
            {
                return `Vandaag.`;
            }
            else if(days == -1)
            {
                return `Gisteren.`;
            }
            return `${Math.abs(days)} dagen te laat.`;
        },
        'NAME_ERROR': 'De naam moet uit ten minste twee tekens bestaan.',
        'DESC_ERROR': 'Er moet ten minste ????n teken in de beschrijving staan.'
    }
};