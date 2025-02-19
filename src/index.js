import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, addDoc, query, orderBy, getDocs, doc, updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    updatePassword
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCCqPw-b1CgoDX3CunxCKZCNbc5d4qKrjo",
    authDomain: "coinstack-backend.firebaseapp.com",
    projectId: "coinstack-backend",
    storageBucket: "coinstack-backend.firebasestorage.app",
    messagingSenderId: "655909863929",
    appId: "1:655909863929:web:3dea46fb247f9eed91bd28",
    measurementId: "G-Z8HHSCMBT0"
}

const BIP39List = {
    '0': 'abandon',
    '1': 'ability',
    '2': 'able',
    '3': 'about',
    '4': 'above',
    '5': 'absent',
    '6': 'absorb',
    '7': 'abstract',
    '8': 'absurd',
    '9': 'abuse',
    '10': 'access',
    '11': 'accident',
    '12': 'account',
    '13': 'accuse',
    '14': 'achieve',
    '15': 'acid',
    '16': 'acoustic',
    '17': 'acquire',
    '18': 'across',
    '19': 'act',
    '20': 'action',
    '21': 'actor',
    '22': 'actress',
    '23': 'actual',
    '24': 'adapt',
    '25': 'add',
    '26': 'addict',
    '27': 'address',
    '28': 'adjust',
    '29': 'admit',
    '30': 'adult',
    '31': 'advance',
    '32': 'advice',
    '33': 'aerobic',
    '34': 'affair',
    '35': 'afford',
    '36': 'afraid',
    '37': 'again',
    '38': 'age',
    '39': 'agent',
    '40': 'agree',
    '41': 'ahead',
    '42': 'aim',
    '43': 'air',
    '44': 'airport',
    '45': 'aisle',
    '46': 'alarm',
    '47': 'album',
    '48': 'alcohol',
    '49': 'alert',
    '50': 'alien',
    '51': 'all',
    '52': 'alley',
    '53': 'allow',
    '54': 'almost',
    '55': 'alone',
    '56': 'alpha',
    '57': 'already',
    '58': 'also',
    '59': 'alter',
    '60': 'always',
    '61': 'amateur',
    '62': 'amazing',
    '63': 'among',
    '64': 'amount',
    '65': 'amused',
    '66': 'analyst',
    '67': 'anchor',
    '68': 'ancient',
    '69': 'anger',
    '70': 'angle',
    '71': 'angry',
    '72': 'animal',
    '73': 'ankle',
    '74': 'announce',
    '75': 'annual',
    '76': 'another',
    '77': 'answer',
    '78': 'antenna',
    '79': 'antique',
    '80': 'anxiety',
    '81': 'any',
    '82': 'apart',
    '83': 'apology',
    '84': 'appear',
    '85': 'apple',
    '86': 'approve',
    '87': 'april',
    '88': 'arch',
    '89': 'arctic',
    '90': 'area',
    '91': 'arena',
    '92': 'argue',
    '93': 'arm',
    '94': 'armed',
    '95': 'armor',
    '96': 'army',
    '97': 'around',
    '98': 'arrange',
    '99': 'arrest',
    '100': 'arrive',
    '101': 'arrow',
    '102': 'art',
    '103': 'artefact',
    '104': 'artist',
    '105': 'artwork',
    '106': 'ask',
    '107': 'aspect',
    '108': 'assault',
    '109': 'asset',
    '110': 'assist',
    '111': 'assume',
    '112': 'asthma',
    '113': 'athlete',
    '114': 'atom',
    '115': 'attack',
    '116': 'attend',
    '117': 'attitude',
    '118': 'attract',
    '119': 'auction',
    '120': 'audit',
    '121': 'august',
    '122': 'aunt',
    '123': 'author',
    '124': 'auto',
    '125': 'autumn',
    '126': 'average',
    '127': 'avocado',
    '128': 'avoid',
    '129': 'awake',
    '130': 'aware',
    '131': 'away',
    '132': 'awesome',
    '133': 'awful',
    '134': 'awkward',
    '135': 'axis',
    '136': 'baby',
    '137': 'bachelor',
    '138': 'bacon',
    '139': 'badge',
    '140': 'bag',
    '141': 'balance',
    '142': 'balcony',
    '143': 'ball',
    '144': 'bamboo',
    '145': 'banana',
    '146': 'banner',
    '147': 'bar',
    '148': 'barely',
    '149': 'bargain',
    '150': 'barrel',
    '151': 'base',
    '152': 'basic',
    '153': 'basket',
    '154': 'battle',
    '155': 'beach',
    '156': 'bean',
    '157': 'beauty',
    '158': 'because',
    '159': 'become',
    '160': 'beef',
    '161': 'before',
    '162': 'begin',
    '163': 'behave',
    '164': 'behind',
    '165': 'believe',
    '166': 'below',
    '167': 'belt',
    '168': 'bench',
    '169': 'benefit',
    '170': 'best',
    '171': 'betray',
    '172': 'better',
    '173': 'between',
    '174': 'beyond',
    '175': 'bicycle',
    '176': 'bid',
    '177': 'bike',
    '178': 'bind',
    '179': 'biology',
    '180': 'bird',
    '181': 'birth',
    '182': 'bitter',
    '183': 'black',
    '184': 'blade',
    '185': 'blame',
    '186': 'blanket',
    '187': 'blast',
    '188': 'bleak',
    '189': 'bless',
    '190': 'blind',
    '191': 'blood',
    '192': 'blossom',
    '193': 'blouse',
    '194': 'blue',
    '195': 'blur',
    '196': 'blush',
    '197': 'board',
    '198': 'boat',
    '199': 'body',
    '200': 'boil',
    '201': 'bomb',
    '202': 'bone',
    '203': 'bonus',
    '204': 'book',
    '205': 'boost',
    '206': 'border',
    '207': 'boring',
    '208': 'borrow',
    '209': 'boss',
    '210': 'bottom',
    '211': 'bounce',
    '212': 'box',
    '213': 'boy',
    '214': 'bracket',
    '215': 'brain',
    '216': 'brand',
    '217': 'brass',
    '218': 'brave',
    '219': 'bread',
    '220': 'breeze',
    '221': 'brick',
    '222': 'bridge',
    '223': 'brief',
    '224': 'bright',
    '225': 'bring',
    '226': 'brisk',
    '227': 'broccoli',
    '228': 'broken',
    '229': 'bronze',
    '230': 'broom',
    '231': 'brother',
    '232': 'brown',
    '233': 'brush',
    '234': 'bubble',
    '235': 'buddy',
    '236': 'budget',
    '237': 'buffalo',
    '238': 'build',
    '239': 'bulb',
    '240': 'bulk',
    '241': 'bullet',
    '242': 'bundle',
    '243': 'bunker',
    '244': 'burden',
    '245': 'burger',
    '246': 'burst',
    '247': 'bus',
    '248': 'business',
    '249': 'busy',
    '250': 'butter',
    '251': 'buyer',
    '252': 'buzz',
    '253': 'cabbage',
    '254': 'cabin',
    '255': 'cable',
    '256': 'cactus',
    '257': 'cage',
    '258': 'cake',
    '259': 'call',
    '260': 'calm',
    '261': 'camera',
    '262': 'camp',
    '263': 'can',
    '264': 'canal',
    '265': 'cancel',
    '266': 'candy',
    '267': 'cannon',
    '268': 'canoe',
    '269': 'canvas',
    '270': 'canyon',
    '271': 'capable',
    '272': 'capital',
    '273': 'captain',
    '274': 'car',
    '275': 'carbon',
    '276': 'card',
    '277': 'cargo',
    '278': 'carpet',
    '279': 'carry',
    '280': 'cart',
    '281': 'case',
    '282': 'cash',
    '283': 'casino',
    '284': 'castle',
    '285': 'casual',
    '286': 'cat',
    '287': 'catalog',
    '288': 'catch',
    '289': 'category',
    '290': 'cattle',
    '291': 'caught',
    '292': 'cause',
    '293': 'caution',
    '294': 'cave',
    '295': 'ceiling',
    '296': 'celery',
    '297': 'cement',
    '298': 'census',
    '299': 'century',
    '300': 'cereal',
    '301': 'certain',
    '302': 'chair',
    '303': 'chalk',
    '304': 'champion',
    '305': 'change',
    '306': 'chaos',
    '307': 'chapter',
    '308': 'charge',
    '309': 'chase',
    '310': 'chat',
    '311': 'cheap',
    '312': 'check',
    '313': 'cheese',
    '314': 'chef',
    '315': 'cherry',
    '316': 'chest',
    '317': 'chicken',
    '318': 'chief',
    '319': 'child',
    '320': 'chimney',
    '321': 'choice',
    '322': 'choose',
    '323': 'chronic',
    '324': 'chuckle',
    '325': 'chunk',
    '326': 'churn',
    '327': 'cigar',
    '328': 'cinnamon',
    '329': 'circle',
    '330': 'citizen',
    '331': 'city',
    '332': 'civil',
    '333': 'claim',
    '334': 'clap',
    '335': 'clarify',
    '336': 'claw',
    '337': 'clay',
    '338': 'clean',
    '339': 'clerk',
    '340': 'clever',
    '341': 'click',
    '342': 'client',
    '343': 'cliff',
    '344': 'climb',
    '345': 'clinic',
    '346': 'clip',
    '347': 'clock',
    '348': 'clog',
    '349': 'close',
    '350': 'cloth',
    '351': 'cloud',
    '352': 'clown',
    '353': 'club',
    '354': 'clump',
    '355': 'cluster',
    '356': 'clutch',
    '357': 'coach',
    '358': 'coast',
    '359': 'coconut',
    '360': 'code',
    '361': 'coffee',
    '362': 'coil',
    '363': 'coin',
    '364': 'collect',
    '365': 'color',
    '366': 'column',
    '367': 'combine',
    '368': 'come',
    '369': 'comfort',
    '370': 'comic',
    '371': 'common',
    '372': 'company',
    '373': 'concert',
    '374': 'conduct',
    '375': 'confirm',
    '376': 'congress',
    '377': 'connect',
    '378': 'consider',
    '379': 'control',
    '380': 'convince',
    '381': 'cook',
    '382': 'cool',
    '383': 'copper',
    '384': 'copy',
    '385': 'coral',
    '386': 'core',
    '387': 'corn',
    '388': 'correct',
    '389': 'cost',
    '390': 'cotton',
    '391': 'couch',
    '392': 'country',
    '393': 'couple',
    '394': 'course',
    '395': 'cousin',
    '396': 'cover',
    '397': 'coyote',
    '398': 'crack',
    '399': 'cradle',
    '400': 'craft',
    '401': 'cram',
    '402': 'crane',
    '403': 'crash',
    '404': 'crater',
    '405': 'crawl',
    '406': 'crazy',
    '407': 'cream',
    '408': 'credit',
    '409': 'creek',
    '410': 'crew',
    '411': 'cricket',
    '412': 'crime',
    '413': 'crisp',
    '414': 'critic',
    '415': 'crop',
    '416': 'cross',
    '417': 'crouch',
    '418': 'crowd',
    '419': 'crucial',
    '420': 'cruel',
    '421': 'cruise',
    '422': 'crumble',
    '423': 'crunch',
    '424': 'crush',
    '425': 'cry',
    '426': 'crystal',
    '427': 'cube',
    '428': 'culture',
    '429': 'cup',
    '430': 'cupboard',
    '431': 'curious',
    '432': 'current',
    '433': 'curtain',
    '434': 'curve',
    '435': 'cushion',
    '436': 'custom',
    '437': 'cute',
    '438': 'cycle',
    '439': 'dad',
    '440': 'damage',
    '441': 'damp',
    '442': 'dance',
    '443': 'danger',
    '444': 'daring',
    '445': 'dash',
    '446': 'daughter',
    '447': 'dawn',
    '448': 'day',
    '449': 'deal',
    '450': 'debate',
    '451': 'debris',
    '452': 'decade',
    '453': 'december',
    '454': 'decide',
    '455': 'decline',
    '456': 'decorate',
    '457': 'decrease',
    '458': 'deer',
    '459': 'defense',
    '460': 'define',
    '461': 'defy',
    '462': 'degree',
    '463': 'delay',
    '464': 'deliver',
    '465': 'demand',
    '466': 'demise',
    '467': 'denial',
    '468': 'dentist',
    '469': 'deny',
    '470': 'depart',
    '471': 'depend',
    '472': 'deposit',
    '473': 'depth',
    '474': 'deputy',
    '475': 'derive',
    '476': 'describe',
    '477': 'desert',
    '478': 'design',
    '479': 'desk',
    '480': 'despair',
    '481': 'destroy',
    '482': 'detail',
    '483': 'detect',
    '484': 'develop',
    '485': 'device',
    '486': 'devote',
    '487': 'diagram',
    '488': 'dial',
    '489': 'diamond',
    '490': 'diary',
    '491': 'dice',
    '492': 'diesel',
    '493': 'diet',
    '494': 'differ',
    '495': 'digital',
    '496': 'dignity',
    '497': 'dilemma',
    '498': 'dinner',
    '499': 'dinosaur',
    '500': 'direct',
    '501': 'dirt',
    '502': 'disagree',
    '503': 'discover',
    '504': 'disease',
    '505': 'dish',
    '506': 'dismiss',
    '507': 'disorder',
    '508': 'display',
    '509': 'distance',
    '510': 'divert',
    '511': 'divide',
    '512': 'divorce',
    '513': 'dizzy',
    '514': 'doctor',
    '515': 'document',
    '516': 'dog',
    '517': 'doll',
    '518': 'dolphin',
    '519': 'domain',
    '520': 'donate',
    '521': 'donkey',
    '522': 'donor',
    '523': 'door',
    '524': 'dose',
    '525': 'double',
    '526': 'dove',
    '527': 'draft',
    '528': 'dragon',
    '529': 'drama',
    '530': 'drastic',
    '531': 'draw',
    '532': 'dream',
    '533': 'dress',
    '534': 'drift',
    '535': 'drill',
    '536': 'drink',
    '537': 'drip',
    '538': 'drive',
    '539': 'drop',
    '540': 'drum',
    '541': 'dry',
    '542': 'duck',
    '543': 'dumb',
    '544': 'dune',
    '545': 'during',
    '546': 'dust',
    '547': 'dutch',
    '548': 'duty',
    '549': 'dwarf',
    '550': 'dynamic',
    '551': 'eager',
    '552': 'eagle',
    '553': 'early',
    '554': 'earn',
    '555': 'earth',
    '556': 'easily',
    '557': 'east',
    '558': 'easy',
    '559': 'echo',
    '560': 'ecology',
    '561': 'economy',
    '562': 'edge',
    '563': 'edit',
    '564': 'educate',
    '565': 'effort',
    '566': 'egg',
    '567': 'eight',
    '568': 'either',
    '569': 'elbow',
    '570': 'elder',
    '571': 'electric',
    '572': 'elegant',
    '573': 'element',
    '574': 'elephant',
    '575': 'elevator',
    '576': 'elite',
    '577': 'else',
    '578': 'embark',
    '579': 'embody',
    '580': 'embrace',
    '581': 'emerge',
    '582': 'emotion',
    '583': 'employ',
    '584': 'empower',
    '585': 'empty',
    '586': 'enable',
    '587': 'enact',
    '588': 'end',
    '589': 'endless',
    '590': 'endorse',
    '591': 'enemy',
    '592': 'energy',
    '593': 'enforce',
    '594': 'engage',
    '595': 'engine',
    '596': 'enhance',
    '597': 'enjoy',
    '598': 'enlist',
    '599': 'enough',
    '600': 'enrich',
    '601': 'enroll',
    '602': 'ensure',
    '603': 'enter',
    '604': 'entire',
    '605': 'entry',
    '606': 'envelope',
    '607': 'episode',
    '608': 'equal',
    '609': 'equip',
    '610': 'era',
    '611': 'erase',
    '612': 'erode',
    '613': 'erosion',
    '614': 'error',
    '615': 'erupt',
    '616': 'escape',
    '617': 'essay',
    '618': 'essence',
    '619': 'estate',
    '620': 'eternal',
    '621': 'ethics',
    '622': 'evidence',
    '623': 'evil',
    '624': 'evoke',
    '625': 'evolve',
    '626': 'exact',
    '627': 'example',
    '628': 'excess',
    '629': 'exchange',
    '630': 'excite',
    '631': 'exclude',
    '632': 'excuse',
    '633': 'execute',
    '634': 'exercise',
    '635': 'exhaust',
    '636': 'exhibit',
    '637': 'exile',
    '638': 'exist',
    '639': 'exit',
    '640': 'exotic',
    '641': 'expand',
    '642': 'expect',
    '643': 'expire',
    '644': 'explain',
    '645': 'expose',
    '646': 'express',
    '647': 'extend',
    '648': 'extra',
    '649': 'eye',
    '650': 'eyebrow',
    '651': 'fabric',
    '652': 'face',
    '653': 'faculty',
    '654': 'fade',
    '655': 'faint',
    '656': 'faith',
    '657': 'fall',
    '658': 'false',
    '659': 'fame',
    '660': 'family',
    '661': 'famous',
    '662': 'fan',
    '663': 'fancy',
    '664': 'fantasy',
    '665': 'farm',
    '666': 'fashion',
    '667': 'fat',
    '668': 'fatal',
    '669': 'father',
    '670': 'fatigue',
    '671': 'fault',
    '672': 'favorite',
    '673': 'feature',
    '674': 'february',
    '675': 'federal',
    '676': 'fee',
    '677': 'feed',
    '678': 'feel',
    '679': 'female',
    '680': 'fence',
    '681': 'festival',
    '682': 'fetch',
    '683': 'fever',
    '684': 'few',
    '685': 'fiber',
    '686': 'fiction',
    '687': 'field',
    '688': 'figure',
    '689': 'file',
    '690': 'film',
    '691': 'filter',
    '692': 'final',
    '693': 'find',
    '694': 'fine',
    '695': 'finger',
    '696': 'finish',
    '697': 'fire',
    '698': 'firm',
    '699': 'first',
    '700': 'fiscal',
    '701': 'fish',
    '702': 'fit',
    '703': 'fitness',
    '704': 'fix',
    '705': 'flag',
    '706': 'flame',
    '707': 'flash',
    '708': 'flat',
    '709': 'flavor',
    '710': 'flee',
    '711': 'flight',
    '712': 'flip',
    '713': 'float',
    '714': 'flock',
    '715': 'floor',
    '716': 'flower',
    '717': 'fluid',
    '718': 'flush',
    '719': 'fly',
    '720': 'foam',
    '721': 'focus',
    '722': 'fog',
    '723': 'foil',
    '724': 'fold',
    '725': 'follow',
    '726': 'food',
    '727': 'foot',
    '728': 'force',
    '729': 'forest',
    '730': 'forget',
    '731': 'fork',
    '732': 'fortune',
    '733': 'forum',
    '734': 'forward',
    '735': 'fossil',
    '736': 'foster',
    '737': 'found',
    '738': 'fox',
    '739': 'fragile',
    '740': 'frame',
    '741': 'frequent',
    '742': 'fresh',
    '743': 'friend',
    '744': 'fringe',
    '745': 'frog',
    '746': 'front',
    '747': 'frost',
    '748': 'frown',
    '749': 'frozen',
    '750': 'fruit',
    '751': 'fuel',
    '752': 'fun',
    '753': 'funny',
    '754': 'furnace',
    '755': 'fury',
    '756': 'future',
    '757': 'gadget',
    '758': 'gain',
    '759': 'galaxy',
    '760': 'gallery',
    '761': 'game',
    '762': 'gap',
    '763': 'garage',
    '764': 'garbage',
    '765': 'garden',
    '766': 'garlic',
    '767': 'garment',
    '768': 'gas',
    '769': 'gasp',
    '770': 'gate',
    '771': 'gather',
    '772': 'gauge',
    '773': 'gaze',
    '774': 'general',
    '775': 'genius',
    '776': 'genre',
    '777': 'gentle',
    '778': 'genuine',
    '779': 'gesture',
    '780': 'ghost',
    '781': 'giant',
    '782': 'gift',
    '783': 'giggle',
    '784': 'ginger',
    '785': 'giraffe',
    '786': 'girl',
    '787': 'give',
    '788': 'glad',
    '789': 'glance',
    '790': 'glare',
    '791': 'glass',
    '792': 'glide',
    '793': 'glimpse',
    '794': 'globe',
    '795': 'gloom',
    '796': 'glory',
    '797': 'glove',
    '798': 'glow',
    '799': 'glue',
    '800': 'goat',
    '801': 'goddess',
    '802': 'gold',
    '803': 'good',
    '804': 'goose',
    '805': 'gorilla',
    '806': 'gospel',
    '807': 'gossip',
    '808': 'govern',
    '809': 'gown',
    '810': 'grab',
    '811': 'grace',
    '812': 'grain',
    '813': 'grant',
    '814': 'grape',
    '815': 'grass',
    '816': 'gravity',
    '817': 'great',
    '818': 'green',
    '819': 'grid',
    '820': 'grief',
    '821': 'grit',
    '822': 'grocery',
    '823': 'group',
    '824': 'grow',
    '825': 'grunt',
    '826': 'guard',
    '827': 'guess',
    '828': 'guide',
    '829': 'guilt',
    '830': 'guitar',
    '831': 'gun',
    '832': 'gym',
    '833': 'habit',
    '834': 'hair',
    '835': 'half',
    '836': 'hammer',
    '837': 'hamster',
    '838': 'hand',
    '839': 'happy',
    '840': 'harbor',
    '841': 'hard',
    '842': 'harsh',
    '843': 'harvest',
    '844': 'hat',
    '845': 'have',
    '846': 'hawk',
    '847': 'hazard',
    '848': 'head',
    '849': 'health',
    '850': 'heart',
    '851': 'heavy',
    '852': 'hedgehog',
    '853': 'height',
    '854': 'hello',
    '855': 'helmet',
    '856': 'help',
    '857': 'hen',
    '858': 'hero',
    '859': 'hidden',
    '860': 'high',
    '861': 'hill',
    '862': 'hint',
    '863': 'hip',
    '864': 'hire',
    '865': 'history',
    '866': 'hobby',
    '867': 'hockey',
    '868': 'hold',
    '869': 'hole',
    '870': 'holiday',
    '871': 'hollow',
    '872': 'home',
    '873': 'honey',
    '874': 'hood',
    '875': 'hope',
    '876': 'horn',
    '877': 'horror',
    '878': 'horse',
    '879': 'hospital',
    '880': 'host',
    '881': 'hotel',
    '882': 'hour',
    '883': 'hover',
    '884': 'hub',
    '885': 'huge',
    '886': 'human',
    '887': 'humble',
    '888': 'humor',
    '889': 'hundred',
    '890': 'hungry',
    '891': 'hunt',
    '892': 'hurdle',
    '893': 'hurry',
    '894': 'hurt',
    '895': 'husband',
    '896': 'hybrid',
    '897': 'ice',
    '898': 'icon',
    '899': 'idea',
    '900': 'identify',
    '901': 'idle',
    '902': 'ignore',
    '903': 'ill',
    '904': 'illegal',
    '905': 'illness',
    '906': 'image',
    '907': 'imitate',
    '908': 'immense',
    '909': 'immune',
    '910': 'impact',
    '911': 'impose',
    '912': 'improve',
    '913': 'impulse',
    '914': 'inch',
    '915': 'include',
    '916': 'income',
    '917': 'increase',
    '918': 'index',
    '919': 'indicate',
    '920': 'indoor',
    '921': 'industry',
    '922': 'infant',
    '923': 'inflict',
    '924': 'inform',
    '925': 'inhale',
    '926': 'inherit',
    '927': 'initial',
    '928': 'inject',
    '929': 'injury',
    '930': 'inmate',
    '931': 'inner',
    '932': 'innocent',
    '933': 'input',
    '934': 'inquiry',
    '935': 'insane',
    '936': 'insect',
    '937': 'inside',
    '938': 'inspire',
    '939': 'install',
    '940': 'intact',
    '941': 'interest',
    '942': 'into',
    '943': 'invest',
    '944': 'invite',
    '945': 'involve',
    '946': 'iron',
    '947': 'island',
    '948': 'isolate',
    '949': 'issue',
    '950': 'item',
    '951': 'ivory',
    '952': 'jacket',
    '953': 'jaguar',
    '954': 'jar',
    '955': 'jazz',
    '956': 'jealous',
    '957': 'jeans',
    '958': 'jelly',
    '959': 'jewel',
    '960': 'job',
    '961': 'join',
    '962': 'joke',
    '963': 'journey',
    '964': 'joy',
    '965': 'judge',
    '966': 'juice',
    '967': 'jump',
    '968': 'jungle',
    '969': 'junior',
    '970': 'junk',
    '971': 'just',
    '972': 'kangaroo',
    '973': 'keen',
    '974': 'keep',
    '975': 'ketchup',
    '976': 'key',
    '977': 'kick',
    '978': 'kid',
    '979': 'kidney',
    '980': 'kind',
    '981': 'kingdom',
    '982': 'kiss',
    '983': 'kit',
    '984': 'kitchen',
    '985': 'kite',
    '986': 'kitten',
    '987': 'kiwi',
    '988': 'knee',
    '989': 'knife',
    '990': 'knock',
    '991': 'know',
    '992': 'lab',
    '993': 'label',
    '994': 'labor',
    '995': 'ladder',
    '996': 'lady',
    '997': 'lake',
    '998': 'lamp',
    '999': 'language',
    '1000': 'laptop',
   '1001': 'large',
   '1002': 'later',
   '1003': 'latin',
   '1004': 'laugh',
   '1005': 'laundry',
   '1006': 'lava',
   '1007': 'law',
   '1008': 'lawn',
   '1009': 'lawsuit',
   '1010': 'layer',
   '1011': 'lazy',
   '1012': 'leader',
   '1013': 'leaf',
   '1014': 'learn',
   '1015': 'leave',
   '1016': 'lecture',
   '1017': 'left',
   '1018': 'leg',
   '1019': 'legal',
   '1020': 'legend',
   '1021': 'leisure',
   '1022': 'lemon',
   '1023': 'lend',
   '1024': 'length',
   '1025': 'lens',
   '1026': 'leopard',
   '1027': 'lesson',
   '1028': 'letter',
   '1029': 'level',
   '1030': 'liar',
   '1031': 'liberty',
   '1032': 'library',
   '1033': 'license',
   '1034': 'life',
   '1035': 'lift',
   '1036': 'light',
   '1037': 'like',
   '1038': 'limb',
   '1039': 'limit',
   '1040': 'link',
   '1041': 'lion',
   '1042': 'liquid',
   '1043': 'list',
   '1044': 'little',
   '1045': 'live',
   '1046': 'lizard',
   '1047': 'load',
   '1048': 'loan',
   '1049': 'lobster',
   '1050': 'local',
   '1051': 'lock',
   '1052': 'logic',
   '1053': 'lonely',
   '1054': 'long',
   '1055': 'loop',
   '1056': 'lottery',
   '1057': 'loud',
   '1058': 'lounge',
   '1059': 'love',
   '1060': 'loyal',
   '1061': 'lucky',
   '1062': 'luggage',
   '1063': 'lumber',
   '1064': 'lunar',
   '1065': 'lunch',
   '1066': 'luxury',
   '1067': 'lyrics',
   '1068': 'machine',
   '1069': 'mad',
   '1070': 'magic',
   '1071': 'magnet',
   '1072': 'maid',
   '1073': 'mail',
   '1074': 'main',
   '1075': 'major',
   '1076': 'make',
   '1077': 'mammal',
   '1078': 'man',
   '1079': 'manage',
   '1080': 'mandate',
   '1081': 'mango',
   '1082': 'mansion',
   '1083': 'manual',
   '1084': 'maple',
   '1085': 'marble',
   '1086': 'march',
   '1087': 'margin',
   '1088': 'marine',
   '1089': 'market',
   '1090': 'marriage',
   '1091': 'mask',
   '1092': 'mass',
   '1093': 'master',
   '1094': 'match',
   '1095': 'material',
   '1096': 'math',
   '1097': 'matrix',
   '1098': 'matter',
   '1099': 'maximum',
   '1100': 'maze',
   '1101': 'meadow',
   '1102': 'mean',
   '1103': 'measure',
   '1104': 'meat',
   '1105': 'mechanic',
   '1106': 'medal',
   '1107': 'media',
   '1108': 'melody',
   '1109': 'melt',
   '1110': 'member',
   '1111': 'memory',
   '1112': 'mention',
   '1113': 'menu',
   '1114': 'mercy',
   '1115': 'merge',
   '1116': 'merit',
   '1117': 'merry',
   '1118': 'mesh',
   '1119': 'message',
   '1120': 'metal',
   '1121': 'method',
   '1122': 'middle',
   '1123': 'midnight',
   '1124': 'milk',
   '1125': 'million',
   '1126': 'mimic',
   '1127': 'mind',
   '1128': 'minimum',
   '1129': 'minor',
   '1130': 'minute',
   '1131': 'miracle',
   '1132': 'mirror',
   '1133': 'misery',
   '1134': 'miss',
   '1135': 'mistake',
   '1136': 'mix',
   '1137': 'mixed',
   '1138': 'mixture',
   '1139': 'mobile',
   '1140': 'model',
   '1141': 'modify',
   '1142': 'mom',
   '1143': 'moment',
   '1144': 'monitor',
   '1145': 'monkey',
   '1146': 'monster',
   '1147': 'month',
   '1148': 'moon',
   '1149': 'moral',
   '1150': 'more',
   '1151': 'morning',
   '1152': 'mosquito',
   '1153': 'mother',
   '1154': 'motion',
   '1155': 'motor',
   '1156': 'mountain',
   '1157': 'mouse',
   '1158': 'move',
   '1159': 'movie',
   '1160': 'much',
   '1161': 'muffin',
   '1162': 'mule',
   '1163': 'multiply',
   '1164': 'muscle',
   '1165': 'museum',
   '1166': 'mushroom',
   '1167': 'music',
   '1168': 'must',
   '1169': 'mutual',
   '1170': 'myself',
   '1171': 'mystery',
   '1172': 'myth',
   '1173': 'naive',
   '1174': 'name',
   '1175': 'napkin',
   '1176': 'narrow',
   '1177': 'nasty',
   '1178': 'nation',
   '1179': 'nature',
   '1180': 'near',
   '1181': 'neck',
   '1182': 'need',
   '1183': 'negative',
   '1184': 'neglect',
   '1185': 'neither',
   '1186': 'nephew',
   '1187': 'nerve',
   '1188': 'nest',
   '1189': 'net',
   '1190': 'network',
   '1191': 'neutral',
   '1192': 'never',
   '1193': 'news',
   '1194': 'next',
   '1195': 'nice',
   '1196': 'night',
   '1197': 'noble',
   '1198': 'noise',
   '1199': 'nominee',
   '1200': 'noodle',
   '1201': 'normal',
   '1202': 'north',
   '1203': 'nose',
   '1204': 'notable',
   '1205': 'note',
   '1206': 'nothing',
   '1207': 'notice',
   '1208': 'novel',
   '1209': 'now',
   '1210': 'nuclear',
   '1211': 'number',
   '1212': 'nurse',
   '1213': 'nut',
   '1214': 'oak',
   '1215': 'obey',
   '1216': 'object',
   '1217': 'oblige',
   '1218': 'obscure',
   '1219': 'observe',
   '1220': 'obtain',
   '1221': 'obvious',
   '1222': 'occur',
   '1223': 'ocean',
   '1224': 'october',
   '1225': 'odor',
   '1226': 'off',
   '1227': 'offer',
   '1228': 'office',
   '1229': 'often',
   '1230': 'oil',
   '1231': 'okay',
   '1232': 'old',
   '1233': 'olive',
   '1234': 'olympic',
   '1235': 'omit',
   '1236': 'once',
   '1237': 'one',
   '1238': 'onion',
   '1239': 'online',
   '1240': 'only',
   '1241': 'open',
   '1242': 'opera',
   '1243': 'opinion',
   '1244': 'oppose',
   '1245': 'option',
   '1246': 'orange',
   '1247': 'orbit',
   '1248': 'orchard',
   '1249': 'order',
   '1250': 'ordinary',
   '1251': 'organ',
   '1252': 'orient',
   '1253': 'original',
   '1254': 'orphan',
   '1255': 'ostrich',
   '1256': 'other',
   '1257': 'outdoor',
   '1258': 'outer',
   '1259': 'output',
   '1260': 'outside',
   '1261': 'oval',
   '1262': 'oven',
   '1263': 'over',
   '1264': 'own',
   '1265': 'owner',
   '1266': 'oxygen',
   '1267': 'oyster',
   '1268': 'ozone',
   '1269': 'pact',
   '1270': 'paddle',
   '1271': 'page',
   '1272': 'pair',
   '1273': 'palace',
   '1274': 'palm',
   '1275': 'panda',
   '1276': 'panel',
   '1277': 'panic',
   '1278': 'panther',
   '1279': 'paper',
   '1280': 'parade',
   '1281': 'parent',
   '1282': 'park',
   '1283': 'parrot',
   '1284': 'party',
   '1285': 'pass',
   '1286': 'patch',
   '1287': 'path',
   '1288': 'patient',
   '1289': 'patrol',
   '1290': 'pattern',
   '1291': 'pause',
   '1292': 'pave',
   '1293': 'payment',
   '1294': 'peace',
   '1295': 'peanut',
   '1296': 'pear',
   '1297': 'peasant',
   '1298': 'pelican',
   '1299': 'pen',
   '1300': 'penalty',
   '1301': 'pencil',
   '1302': 'people',
   '1303': 'pepper',
   '1304': 'perfect',
   '1305': 'permit',
   '1306': 'person',
   '1307': 'pet',
   '1308': 'phone',
   '1309': 'photo',
   '1310': 'phrase',
   '1311': 'physical',
   '1312': 'piano',
   '1313': 'picnic',
   '1314': 'picture',
   '1315': 'piece',
   '1316': 'pig',
   '1317': 'pigeon',
   '1318': 'pill',
   '1319': 'pilot',
   '1320': 'pink',
   '1321': 'pioneer',
   '1322': 'pipe',
   '1323': 'pistol',
   '1324': 'pitch',
   '1325': 'pizza',
   '1326': 'place',
   '1327': 'planet',
   '1328': 'plastic',
   '1329': 'plate',
   '1330': 'play',
   '1331': 'please',
   '1332': 'pledge',
   '1333': 'pluck',
   '1334': 'plug',
   '1335': 'plunge',
   '1336': 'poem',
   '1337': 'poet',
   '1338': 'point',
   '1339': 'polar',
   '1340': 'pole',
   '1341': 'police',
   '1342': 'pond',
   '1343': 'pony',
   '1344': 'pool',
   '1345': 'popular',
   '1346': 'portion',
   '1347': 'position',
   '1348': 'possible',
   '1349': 'post',
   '1350': 'potato',
   '1351': 'pottery',
   '1352': 'poverty',
   '1353': 'powder',
   '1354': 'power',
   '1355': 'practice',
   '1356': 'praise',
   '1357': 'predict',
   '1358': 'prefer',
   '1359': 'prepare',
   '1360': 'present',
   '1361': 'pretty',
   '1362': 'prevent',
   '1363': 'price',
   '1364': 'pride',
   '1365': 'primary',
   '1366': 'print',
   '1367': 'priority',
   '1368': 'prison',
   '1369': 'private',
   '1370': 'prize',
   '1371': 'problem',
   '1372': 'process',
   '1373': 'produce',
   '1374': 'profit',
   '1375': 'program',
   '1376': 'project',
   '1377': 'promote',
   '1378': 'proof',
   '1379': 'property',
   '1380': 'prosper',
   '1381': 'protect',
   '1382': 'proud',
   '1383': 'provide',
   '1384': 'public',
   '1385': 'pudding',
   '1386': 'pull',
   '1387': 'pulp',
   '1388': 'pulse',
   '1389': 'pumpkin',
   '1390': 'punch',
   '1391': 'pupil',
   '1392': 'puppy',
   '1393': 'purchase',
   '1394': 'purity',
   '1395': 'purpose',
   '1396': 'purse',
   '1397': 'push',
   '1398': 'put',
   '1399': 'puzzle',
   '1400': 'pyramid',
   '1401': 'quality',
   '1402': 'quantum',
   '1403': 'quarter',
   '1404': 'question',
   '1405': 'quick',
   '1406': 'quit',
   '1407': 'quiz',
   '1408': 'quote',
   '1409': 'rabbit',
   '1410': 'raccoon',
   '1411': 'race',
   '1412': 'rack',
   '1413': 'radar',
   '1414': 'radio',
   '1415': 'rail',
   '1416': 'rain',
   '1417': 'raise',
   '1418': 'rally',
   '1419': 'ramp',
   '1420': 'ranch',
   '1421': 'random',
   '1422': 'range',
   '1423': 'rapid',
   '1424': 'rare',
   '1425': 'rate',
   '1426': 'rather',
   '1427': 'raven',
   '1428': 'raw',
   '1429': 'razor',
   '1430': 'ready',
   '1431': 'real',
   '1432': 'reason',
   '1433': 'rebel',
   '1434': 'rebuild',
   '1435': 'recall',
   '1436': 'receive',
   '1437': 'recipe',
   '1438': 'record',
   '1439': 'recycle',
   '1440': 'reduce',
   '1441': 'reflect',
   '1442': 'reform',
   '1443': 'refuse',
   '1444': 'region',
   '1445': 'regret',
   '1446': 'regular',
   '1447': 'reject',
   '1448': 'relax',
   '1449': 'release',
   '1450': 'relief',
   '1451': 'rely',
   '1452': 'remain',
   '1453': 'remember',
   '1454': 'remind',
   '1455': 'remove',
   '1456': 'render',
   '1457': 'renew',
   '1458': 'rent',
   '1459': 'reopen',
   '1460': 'repair',
   '1461': 'repeat',
   '1462': 'replace',
   '1463': 'report',
   '1464': 'require',
   '1465': 'rescue',
   '1466': 'resemble',
   '1467': 'resist',
   '1468': 'resource',
   '1469': 'response',
   '1470': 'result',
   '1471': 'retire',
   '1472': 'retreat',
   '1473': 'return',
   '1474': 'reunion',
   '1475': 'reveal',
   '1476': 'review',
   '1477': 'reward',
   '1478': 'rhythm',
   '1479': 'rib',
   '1480': 'ribbon',
   '1481': 'rice',
   '1482': 'rich',
   '1483': 'ride',
   '1484': 'ridge',
   '1485': 'rifle',
   '1486': 'right',
   '1487': 'rigid',
   '1488': 'ring',
   '1489': 'riot',
   '1490': 'ripple',
   '1491': 'risk',
   '1492': 'ritual',
   '1493': 'rival',
   '1494': 'river',
   '1495': 'road',
   '1496': 'roast',
   '1497': 'robot',
   '1498': 'robust',
   '1499': 'rocket',
   '1500': 'romance',
   '1501': 'roof',
   '1502': 'rookie',
   '1503': 'room',
   '1504': 'rose',
   '1505': 'rotate',
   '1506': 'rough',
   '1507': 'round',
   '1508': 'route',
   '1509': 'royal',
   '1510': 'rubber',
   '1511': 'rude',
   '1512': 'rug',
   '1513': 'rule',
   '1514': 'run',
   '1515': 'runway',
   '1516': 'rural',
   '1517': 'sad',
   '1518': 'saddle',
   '1519': 'sadness',
   '1520': 'safe',
   '1521': 'sail',
   '1522': 'salad',
   '1523': 'salmon',
   '1524': 'salon',
   '1525': 'salt',
   '1526': 'salute',
   '1527': 'same',
   '1528': 'sample',
   '1529': 'sand',
   '1530': 'satisfy',
   '1531': 'satoshi',
   '1532': 'sauce',
   '1533': 'sausage',
   '1534': 'save',
   '1535': 'say',
   '1536': 'scale',
   '1537': 'scan',
   '1538': 'scare',
   '1539': 'scatter',
   '1540': 'scene',
   '1541': 'scheme',
   '1542': 'school',
   '1543': 'science',
   '1544': 'scissors',
   '1545': 'scorpion',
   '1546': 'scout',
   '1547': 'scrap',
   '1548': 'screen',
   '1549': 'script',
   '1550': 'scrub',
   '1551': 'sea',
   '1552': 'search',
   '1553': 'season',
   '1554': 'seat',
   '1555': 'second',
   '1556': 'secret',
   '1557': 'section',
   '1558': 'security',
   '1559': 'seed',
   '1560': 'seek',
   '1561': 'segment',
   '1562': 'select',
   '1563': 'sell',
   '1564': 'seminar',
   '1565': 'senior',
   '1566': 'sense',
   '1567': 'sentence',
   '1568': 'series',
   '1569': 'service',
   '1570': 'session',
   '1571': 'settle',
   '1572': 'setup',
   '1573': 'seven',
   '1574': 'shadow',
   '1575': 'shaft',
   '1576': 'shallow',
   '1577': 'share',
   '1578': 'shed',
   '1579': 'shell',
   '1580': 'sheriff',
   '1581': 'shield',
   '1582': 'shift',
   '1583': 'shine',
   '1584': 'ship',
   '1585': 'shiver',
   '1586': 'shock',
   '1587': 'shoe',
   '1588': 'shoot',
   '1589': 'shop',
   '1590': 'short',
   '1591': 'shoulder',
   '1592': 'shove',
   '1593': 'shrimp',
   '1594': 'shrug',
   '1595': 'shuffle',
   '1596': 'shy',
   '1597': 'sibling',
   '1598': 'sick',
   '1599': 'side',
   '1600': 'siege',
   '1601': 'sight',
   '1602': 'sign',
   '1603': 'silent',
   '1604': 'silk',
   '1605': 'silly',
   '1606': 'silver',
   '1607': 'similar',
   '1608': 'simple',
   '1609': 'since',
   '1610': 'sing',
   '1611': 'siren',
   '1612': 'sister',
   '1613': 'situate',
   '1614': 'six',
   '1615': 'size',
   '1616': 'skate',
   '1617': 'sketch',
   '1618': 'ski',
   '1619': 'skill',
   '1620': 'skin',
   '1621': 'skirt',
   '1622': 'skull',
   '1623': 'slab',
   '1624': 'slam',
   '1625': 'sleep',
   '1626': 'slender',
   '1627': 'slice',
   '1628': 'slide',
   '1629': 'slight',
   '1630': 'slim',
   '1631': 'slogan',
   '1632': 'slot',
   '1633': 'slow',
   '1634': 'slush',
   '1635': 'small',
   '1636': 'smart',
   '1637': 'smile',
   '1638': 'smoke',
   '1639': 'smooth',
   '1640': 'snack',
   '1641': 'snake',
   '1642': 'snap',
   '1643': 'sniff',
   '1644': 'snow',
   '1645': 'soap',
   '1646': 'soccer',
   '1647': 'social',
   '1648': 'sock',
   '1649': 'soda',
   '1650': 'soft',
   '1651': 'solar',
   '1652': 'soldier',
   '1653': 'solid',
   '1654': 'solution',
   '1655': 'solve',
   '1656': 'someone',
   '1657': 'song',
   '1658': 'soon',
   '1659': 'sorry',
   '1660': 'sort',
   '1661': 'soul',
   '1662': 'sound',
   '1663': 'soup',
   '1664': 'source',
   '1665': 'south',
   '1666': 'space',
   '1667': 'spare',
   '1668': 'spatial',
   '1669': 'spawn',
   '1670': 'speak',
   '1671': 'special',
   '1672': 'speed',
   '1673': 'spell',
   '1674': 'spend',
   '1675': 'sphere',
   '1676': 'spice',
   '1677': 'spider',
   '1678': 'spike',
   '1679': 'spin',
   '1680': 'spirit',
   '1681': 'split',
   '1682': 'spoil',
   '1683': 'sponsor',
   '1684': 'spoon',
   '1685': 'sport',
   '1686': 'spot',
   '1687': 'spray',
   '1688': 'spread',
   '1689': 'spring',
   '1690': 'spy',
   '1691': 'square',
   '1692': 'squeeze',
   '1693': 'squirrel',
   '1694': 'stable',
   '1695': 'stadium',
   '1696': 'staff',
   '1697': 'stage',
   '1698': 'stairs',
   '1699': 'stamp',
   '1700': 'stand',
   '1701': 'start',
   '1702': 'state',
   '1703': 'stay',
   '1704': 'steak',
   '1705': 'steel',
   '1706': 'stem',
   '1707': 'step',
   '1708': 'stereo',
   '1709': 'stick',
   '1710': 'still',
   '1711': 'sting',
   '1712': 'stock',
   '1713': 'stomach',
   '1714': 'stone',
   '1715': 'stool',
   '1716': 'story',
   '1717': 'stove',
   '1718': 'strategy',
   '1719': 'street',
   '1720': 'strike',
   '1721': 'strong',
   '1722': 'struggle',
   '1723': 'student',
   '1724': 'stuff',
   '1725': 'stumble',
   '1726': 'style',
   '1727': 'subject',
   '1728': 'submit',
   '1729': 'subway',
   '1730': 'success',
   '1731': 'such',
   '1732': 'sudden',
   '1733': 'suffer',
   '1734': 'sugar',
   '1735': 'suggest',
   '1736': 'suit',
   '1737': 'summer',
   '1738': 'sun',
   '1739': 'sunny',
   '1740': 'sunset',
   '1741': 'super',
   '1742': 'supply',
   '1743': 'supreme',
   '1744': 'sure',
   '1745': 'surface',
   '1746': 'surge',
   '1747': 'surprise',
   '1748': 'surround',
   '1749': 'survey',
   '1750': 'suspect',
   '1751': 'sustain',
   '1752': 'swallow',
   '1753': 'swamp',
   '1754': 'swap',
   '1755': 'swarm',
   '1756': 'swear',
   '1757': 'sweet',
   '1758': 'swift',
   '1759': 'swim',
   '1760': 'swing',
   '1761': 'switch',
   '1762': 'sword',
   '1763': 'symbol',
   '1764': 'symptom',
   '1765': 'syrup',
   '1766': 'system',
   '1767': 'table',
   '1768': 'tackle',
   '1769': 'tag',
   '1770': 'tail',
   '1771': 'talent',
   '1772': 'talk',
   '1773': 'tank',
   '1774': 'tape',
   '1775': 'target',
   '1776': 'task',
   '1777': 'taste',
   '1778': 'tattoo',
   '1779': 'taxi',
   '1780': 'teach',
   '1781': 'team',
   '1782': 'tell',
   '1783': 'ten',
   '1784': 'tenant',
   '1785': 'tennis',
   '1786': 'tent',
   '1787': 'term',
   '1788': 'test',
   '1789': 'text',
   '1790': 'thank',
   '1791': 'that',
   '1792': 'theme',
   '1793': 'then',
   '1794': 'theory',
   '1795': 'there',
   '1796': 'they',
   '1797': 'thing',
   '1798': 'this',
   '1799': 'thought',
   '1800': 'three',
   '1801': 'thrive',
   '1802': 'throw',
   '1803': 'thumb',
   '1804': 'thunder',
   '1805': 'ticket',
   '1806': 'tide',
   '1807': 'tiger',
   '1808': 'tilt',
   '1809': 'timber',
   '1810': 'time',
   '1811': 'tiny',
   '1812': 'tip',
   '1813': 'tired',
   '1814': 'tissue',
   '1815': 'title',
   '1816': 'toast',
   '1817': 'tobacco',
   '1818': 'today',
   '1819': 'toddler',
   '1820': 'toe',
   '1821': 'together',
   '1822': 'toilet',
   '1823': 'token',
   '1824': 'tomato',
   '1825': 'tomorrow',
   '1826': 'tone',
   '1827': 'tongue',
   '1828': 'tonight',
   '1829': 'tool',
   '1830': 'tooth',
   '1831': 'top',
   '1832': 'topic',
   '1833': 'topple',
   '1834': 'torch',
   '1835': 'tornado',
   '1836': 'tortoise',
   '1837': 'toss',
   '1838': 'total',
   '1839': 'tourist',
   '1840': 'toward',
   '1841': 'tower',
   '1842': 'town',
   '1843': 'toy',
   '1844': 'track',
   '1845': 'trade',
   '1846': 'traffic',
   '1847': 'tragic',
   '1848': 'train',
   '1849': 'transfer',
   '1850': 'trap',
   '1851': 'trash',
   '1852': 'travel',
   '1853': 'tray',
   '1854': 'treat',
   '1855': 'tree',
   '1856': 'trend',
   '1857': 'trial',
   '1858': 'tribe',
   '1859': 'trick',
   '1860': 'trigger',
   '1861': 'trim',
   '1862': 'trip',
   '1863': 'trophy',
   '1864': 'trouble',
   '1865': 'truck',
   '1866': 'true',
   '1867': 'truly',
   '1868': 'trumpet',
   '1869': 'trust',
   '1870': 'truth',
   '1871': 'try',
   '1872': 'tube',
   '1873': 'tuition',
   '1874': 'tumble',
   '1875': 'tuna',
   '1876': 'tunnel',
   '1877': 'turkey',
   '1878': 'turn',
   '1879': 'turtle',
   '1880': 'twelve',
   '1881': 'twenty',
   '1882': 'twice',
   '1883': 'twin',
   '1884': 'twist',
   '1885': 'two',
   '1886': 'type',
   '1887': 'typical',
   '1888': 'ugly',
   '1889': 'umbrella',
   '1890': 'unable',
   '1891': 'unaware',
   '1892': 'uncle',
   '1893': 'uncover',
   '1894': 'under',
   '1895': 'undo',
   '1896': 'unfair',
   '1897': 'unfold',
   '1898': 'unhappy',
   '1899': 'uniform',
   '1900': 'unique',
   '1901': 'unit',
   '1902': 'universe',
   '1903': 'unknown',
   '1904': 'unlock',
   '1905': 'until',
   '1906': 'unusual',
   '1907': 'unveil',
   '1908': 'update',
   '1909': 'upgrade',
   '1910': 'uphold',
   '1911': 'upon',
   '1912': 'upper',
   '1913': 'upset',
   '1914': 'urban',
   '1915': 'urge',
   '1916': 'usage',
   '1917': 'use',
   '1918': 'used',
   '1919': 'useful',
   '1920': 'useless',
   '1921': 'usual',
   '1922': 'utility',
   '1923': 'vacant',
   '1924': 'vacuum',
   '1925': 'vague',
   '1926': 'valid',
   '1927': 'valley',
   '1928': 'valve',
   '1929': 'van',
   '1930': 'vanish',
   '1931': 'vapor',
   '1932': 'various',
   '1933': 'vast',
   '1934': 'vault',
   '1935': 'vehicle',
   '1936': 'velvet',
   '1937': 'vendor',
   '1938': 'venture',
   '1939': 'venue',
   '1940': 'verb',
   '1941': 'verify',
   '1942': 'version',
   '1943': 'very',
   '1944': 'vessel',
   '1945': 'veteran',
   '1946': 'viable',
   '1947': 'vibrant',
   '1948': 'vicious',
   '1949': 'victory',
   '1950': 'video',
   '1951': 'view',
   '1952': 'village',
   '1953': 'vintage',
   '1954': 'violin',
   '1955': 'virtual',
   '1956': 'virus',
   '1957': 'visa',
   '1958': 'visit',
   '1959': 'visual',
   '1960': 'vital',
   '1961': 'vivid',
   '1962': 'vocal',
   '1963': 'voice',
   '1964': 'void',
   '1965': 'volcano',
   '1966': 'volume',
   '1967': 'vote',
   '1968': 'voyage',
   '1969': 'wage',
   '1970': 'wagon',
   '1971': 'wait',
   '1972': 'walk',
   '1973': 'wall',
   '1974': 'walnut',
   '1975': 'want',
   '1976': 'warfare',
   '1977': 'warm',
   '1978': 'warrior',
   '1979': 'wash',
   '1980': 'wasp',
   '1981': 'waste',
   '1982': 'water',
   '1983': 'wave',
   '1984': 'way',
   '1985': 'wealth',
   '1986': 'weapon',
   '1987': 'wear',
   '1988': 'weasel',
   '1989': 'weather',
   '1990': 'web',
   '1991': 'wedding',
   '1992': 'weekend',
   '1993': 'weird',
   '1994': 'welcome',
   '1995': 'west',
   '1996': 'wet',
   '1997': 'whale',
   '1998': 'what',
   '1999': 'wheat',
   '2000': 'wheel',
   '2001': 'when',
   '2002': 'where',
   '2003': 'whip',
   '2004': 'whisper',
   '2005': 'wide',
   '2006': 'width',
   '2007': 'wife',
   '2008': 'wild',
   '2009': 'will',
   '2010': 'win',
   '2011': 'window',
   '2012': 'wine',
   '2013': 'wing',
   '2014': 'wink',
   '2015': 'winner',
   '2016': 'winter',
   '2017': 'wire',
   '2018': 'wisdom',
   '2019': 'wise',
   '2020': 'wish',
   '2021': 'witness',
   '2022': 'wolf',
   '2023': 'woman',
   '2024': 'wonder',
   '2025': 'wood',
   '2026': 'wool',
   '2027': 'word',
   '2028': 'work',
   '2029': 'world',
   '2030': 'worry',
   '2031': 'worth',
   '2032': 'wrap',
   '2033': 'wreck',
   '2034': 'wrestle',
   '2035': 'wrist',
   '2036': 'write',
   '2037': 'wrong',
   '2038': 'yard',
   '2039': 'year',
   '2040': 'yellow',
   '2041': 'you',
   '2042': 'young',
   '2043': 'youth',
   '2044': 'zebra',
   '2045': 'zero',
   '2046': 'zone',
   '2047': 'zoo',
}

initializeApp(firebaseConfig)

function generateHex(len) {
    const hexDigits = '0123456789abcdef'
    let output = ''
    for(let i = 0; i < len; i++){
        output += hexDigits[Math.floor(Math.random() * 16)]
    }
    return '0x' + output
}

const db = getFirestore()
const auth = getAuth()

const transactionsRef = collection(db, 'transactions')
const userDetailsRef = collection(db, 'userDetails')

let body = document.querySelector('body') /* Universal */

const loginForm = document.querySelector('#loginForm')
const signinForm = document.querySelector('#signinForm')
const loginContinue = document.querySelector('#loginContinue')
const signinContinue = document.querySelector('#signinContinue')
const mnemonicContinue = document.getElementById('mnemonicContinue')
const mnemonicCheckContinue = document.getElementById('mnemonicCheckContinue')
const changePassContinue = document.getElementById('changePassContinue')
let query_
let userDoc
let userDocID

if (loginForm){
    const loginError = document.querySelector('#loginError')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
    })
    loginContinue.addEventListener('click', (e) => {
        e.preventDefault()
        loginError.innerText = ''
        const email = loginForm.email.value
        const password = loginForm.password.value

        if (!email){
            loginError.innerText = 'Error : Enter your E-Mail ID'
        }
        else if (!password){
            loginError.innerText = 'Error : Enter your password'
        }
        else{
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                getDocs(userDetailsRef)
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        if(email === doc.data()['email']){
                            userDoc = doc.data()
                            localStorage.setItem('userDoc', JSON.stringify(userDoc));
                            alert('Logged in successfully !')
                            loginForm.reset()
                            window.location.href = './frontpage.html'
                        }
                    })
                })
            })
            .catch((err) => {
                console.log(err.message)
                loginError.innerText = ''
                if (err.message === 'Firebase: Error (auth/invalid-credential).'){
                    loginError.innerText = 'Error : Invalid Log-In Credentials'
                }
                else if (err.message === 'Firebase: Error (auth/invalid-email).'){
                    loginError.innerText = 'Error : Enter a valid E-Mail ID'
                }
            })
        }
    })

    const forgotPassBtn = document.getElementById('forgotPassBtn')
    forgotPassBtn.addEventListener('click', () => {
        loginError.innerText = ''
        const email = loginForm.email.value
        if (!email){
            loginError.innerText = 'Please first enter your E-Mail ID'
        }
        else{
            getDocs(userDetailsRef)
            .then((snapshot) => {
                let check = 0
                snapshot.docs.forEach((doc) => {
                    if(email === doc.data()['email']){
                        userDoc = doc.data()
                        localStorage.setItem('userDoc', JSON.stringify(userDoc))
                        check = 1
                    }
                })
                if (check){
                    window.location.href = './mnemonicCheck.html'
                }
                else {
                    loginError.innerText = 'Please enter the correct Email-ID'
                }
            })
        }
    })
}

if (signinForm){
    const signinError = document.querySelector('#signinError')
    signinContinue.addEventListener('click', (e) => {
        e.preventDefault()
        signinError.innerText = ''
        const name = signinForm.name.value
        const email = signinForm.email.value
        const password = signinForm.password.value

        if(!name){
            signinError.innerText = 'Error : Enter your name'
        }
        else if (!email){
            signinError.innerText = 'Error : Enter your E-Mail ID'
        }
        else if (!password){
            signinError.innerText = 'Error : Enter your password'
        }
        else{
            let mnemonic = {}
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                let rand
                for (let i = 0; i < 12; i++){
                    rand = Math.floor(Math.random() * 2048)
                    mnemonic[i] = BIP39List[rand]
                }

                userDoc = {
                    'name' : name,
                    'email' : email,
                    'password' : password,
                    'network' : {
                        'amoy' : {
                            'amount' : 100,
                            'pkh' : generateHex(40),
                            'pvtkey' : generateHex(64),
                        },
                    },
                    'mnemonic' : mnemonic,
                }

                localStorage.setItem('userDoc', JSON.stringify(userDoc));

                addDoc(userDetailsRef, userDoc)
                .then(() => {
                    alert('Account created Successfully. You get 100 POL on Amoy Network as Sign-In Bonus !')
                    signinForm.reset()
                    window.location.href = './mnemonic.html'
                })
                .catch((err) => {
                    console.log(err.message)
                })
            })
            .catch((err) => {
                signinError.innerText = ''
                if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
                    signinError.innerText = 'Error : Password should be atleast 6 characters long'
                }
                else if (err.message === 'Firebase: Error (auth/invalid-email).'){
                    signinError.innerText = 'Error : Enter a valid E-Mail ID'
                }
                else if (err.message === 'Firebase: Error (auth/email-already-in-use).'){
                    signinError.innerText = 'Error : E-Mail ID already in use'
                }
            })
        }
    })
}

const passwordView = document.querySelector('#privacyView')
const passInput = document.querySelector('input[name="password"]')

if (passwordView && passInput){
    passInput.type = 'password'
    passInput.innerHTML = 'Show Password'

    passwordView.addEventListener('click', (e) => {
        e.preventDefault()
        passInput.type = (passInput.type === 'password') ? 'text' : 'password'
        passwordView.innerHTML = (passwordView.innerHTML === 'Show Password') ? 'Hide Password' : 'Show Password'    
    })
}

async function getID(email) {
    const snapshot = await getDocs(userDetailsRef)
    for(let doc of snapshot.docs){
        if(email === doc.data().email){
            return doc.id
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    userDoc = JSON.parse(localStorage.getItem('userDoc'));
    getID(userDoc.email).then((id) => {
        userDocID = id
    })

    if (mnemonicContinue){
        for (let i = 0; i < 12; i++) {
            let element = document.getElementById('word'+(i+1)).querySelector('p')
            element.innerText = userDoc['mnemonic'][i]
        }

        mnemonicContinue.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem('userDoc', JSON.stringify(userDoc));
            window.location.href = './frontpage.html'
        })
    }

    else if(mnemonicCheckContinue){
        const mnemonicCheckForm = document.querySelector('#mnemonicCheckForm')
        mnemonicCheckContinue.addEventListener('click', (e) => {
            e.preventDefault()
            const mnemonicError = document.querySelector('#mnemonicError')
            mnemonicError.innerText = ''
            let check = 1
            let originalMnemonics = userDoc.mnemonic
            for (let i = 0; i < 12; i++) {
                let word = mnemonicCheckForm['word'+(i+1)]['value']
                if(originalMnemonics[i] !== word){
                    check = 0
                    break
                }
            }
            if(check === 1){
                localStorage.setItem('userDoc', JSON.stringify(userDoc));
                window.location.href = './changePass.html'
            }
            else if(check === 0){
                mnemonicError.innerText = 'Invalid Mnemonics'
            }
        })
    }

    else if(changePassContinue){
        const changePassForm = document.getElementById('changePassForm')
        const changePassError = document.getElementById('changePassError')
        changePassError.innerText = ''
        changePassContinue.addEventListener('click', (e) => {
            e.preventDefault()
            changePassError.innerText = ''
            if(!changePassForm.password.value){
                changePassError.innerText = 'Please Enter A Password'
            }
            else{
                const newPass = changePassForm.password.value
                changePassword(userDoc.email, userDoc.password, newPass, userDocID)
            }
        })
    }
})

async function changePassword(email, oldPass, newPass, ID) {
    const cred = await signInWithEmailAndPassword(auth, email, oldPass)
    const user = cred.user

    updatePassword(user, newPass)
    .then(() => {
        const docRef = doc(db, 'userDetails', ID)
        updateDoc(docRef, {
            'password' : newPass,
        })
        .then(() => {
            userDoc.password = newPass
            localStorage.setItem('userDoc', JSON.stringify(userDoc));
            alert('Password Changed Successfully')
            window.location.href = './frontpage.html'
        })
        .catch((err) => {
            console.log(err.message)
        })
    })
    .catch((err) => {
        const changePassError = document.getElementById('changePassError')
        
        if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            changePassError.innerText = 'Error : Password should be atleast 6 characters long'
        }
    })    
}
/*

logo taken from https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dcrypto%2Bwallet&psig=AOvVaw3NwrRSlVuPkwsvOyBdisOy&ust=1734343938432000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCKC76fDEqYoDFQAAAAAdAAAAABAE

*/

const userName = document.querySelector('#userName')
const userAddress = document.querySelector('#userAddress')
const receivingDetails = document.querySelector('#receivingDetailsWrapper')
const sendingWrapper = document.querySelector('#sendingWrapper')
const balance = document.querySelector('#balance')
const balanceWrapper = document.querySelector('#balanceWrapper')
const txbuttons = document.querySelector('#txbuttons')
const dimmer = document.querySelector('.visible')
const networkOptions = document.querySelector('#networkOptions')
const addNetworkBtn = Array.from(document.querySelectorAll('.addNetworkBtn'))
let displayNetworkBtn = Array.from(document.querySelectorAll('.displayNetworkBtn'))
const enabledNetworks = document.querySelector('.enabledNetworks')
const availableNetworks = document.querySelector('.availableNetworks')
const changeNetwork = document.querySelector("#changeNetwork")
const allNetworks = document.querySelector('.allNetworks')
const allNetworksLeft = document.querySelector('#allNetworksLeft')
const allNetworksRight = document.querySelector('#allNetworksRight')
const changeName = document.querySelector('#changeName')
const privateKey = document.querySelector('#privateKey')
let userCoins = {
    'amoy' : {
        'amount' : 100,
        'pkh' : generateHex(40),
        'pvtKey' : generateHex(64),
    },
}

document.addEventListener('DOMContentLoaded', () => {
    userDoc = JSON.parse(localStorage.getItem('userDoc'))
    getID(userDoc.email).then((id) => {
        userDocID = id
    })

    const logout = document.getElementById('logout')

    logout.addEventListener('click', () => {
        signOut(auth)
        .then(() => {
            userDoc = {}
            userDocID = ''
            localStorage.clear()
            alert('Signed Out')
            window.location.href = './homepage.html'
        })
    })

    if (userName){
        getDocs(userDetailsRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                if(userDoc.email === doc.data()['email']){
                    userDoc = doc.data()
                    userCoins = userDoc.network

                    for(let net in userCoins){
                        if(net === 'amoy'){
                            continue
                        }
                        else{
                            let buttonContainer = document.getElementById(net)
                            let button2 = document.createElement('button')
                            let div = document.createElement('div')
                            let img = document.createElement('img')
                    
                            div.className = 'networkContainer'
                            div.id = net
                    
                            button2.className = "displayNetworkBtn"
                            button2.id = net
                            button2.textContent = buttonContainer.querySelector('span').textContent
                    
                            img.src = `../src/${net}.png`
                            img.className = 'cryptoLogo'
                    
                            div.appendChild(img)
                            div.appendChild(button2)
                            enabledNetworks.appendChild(div)
                            availableNetworks.removeChild(buttonContainer)

                            updateCoinInfo()
                        }
                    }

                    updateEventListener()

                    updateBalance()
                }
            })
            userName.innerText += userDoc.name

            const pkhs = []
            for(let net in userDoc.network){
                pkhs.push(userDoc.network[net].pkh)
            }

            let transactions = []

            let q = query(transactionsRef, orderBy('time', 'desc'))

            getDocs(q)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if(pkhs.includes(doc.data().fromPKH) || pkhs.includes(doc.data().toPKH)){
                        transactions.push(doc.data())
                    }
                })
                if(transactions.length){
                    let texts = allNetworksRight.querySelectorAll('.noTx')
                    if(texts){
                        for(let text of texts){
                            allNetworksRight.removeChild(text)
                        }
                    }

                    for(let transaction_ of transactions){
                        if(pkhs.includes(transaction_.toPKH) && transaction_.status === 0){
                            continue
                        }

                        let div = document.createElement('div')
                        div.className = 'transaction'
                        div.id = transaction_.network + 'Tx'
                        
                        let txWrapper = document.createElement('div')
                        let nameWrapper = document.createElement('div')
                        txWrapper.className = 'txWrapper'
                        nameWrapper.className = 'nameWrapper'

                        let text1 = document.createElement('p')
                        let text2 = document.createElement('p')
                        let text3 = document.createElement('p')
                        let text4 = document.createElement('p')
                        let text5 = document.createElement('p')

                        if(transaction_.status){
                            if(pkhs.includes(transaction_.fromPKH)){
                                text1.textContent = 'Sent'
                            }
                            else{
                                text1.textContent = 'Received'
                            }
                        }
                        else{
                            text1.textContent = 'Failed'
                        }
                        text2.textContent = transaction_.amount + ' ' + networkTokens[transaction_.network]
                        text3.textContent = '₹ ' + (transaction_.amountINR)
                        text4.textContent = transaction_.toPKH + ' (' + netNamesFromID[transaction_.network] + ')'
                        const time = (transaction_.time.seconds + transaction_.time.nanoseconds/1000000000) * 1000
                        const date = new Date(time)
                        text5.textContent = date.toLocaleString()

                        text1.className = 'text1'
                        text2.className = 'text2'
                        text3.className = 'text3'
                        text4.className = 'text4'
                        text5.className = 'text5'

                        txWrapper.appendChild(text2)
                        txWrapper.appendChild(text3)

                        nameWrapper.appendChild(text1)
                        nameWrapper.appendChild(text4)
                        nameWrapper.appendChild(text5)

                        div.appendChild(nameWrapper)
                        div.appendChild(txWrapper)

                        allNetworksRight.appendChild(div)
                    }
                }
            })
        })
    }
})

if(changeNetwork){
    if(changeNetwork.textContent === 'All Networks'){
        changeNetwork.querySelector('img').style.width = '0px'
        changeNetwork.querySelector('img').style.padding = '0px'

        balanceWrapper.removeChild(txbuttons)
    }
}

const netNamesFromID = {
    'amoy' : 'Amoy',
    'arbitrumOne' : 'Arbitrum One',
    'avalanche' : 'Avalanche C-Chain',
    'base' : 'Base Mainnet',
    'bitcoin' : 'Bitcoin Network',
    'donatuz' : 'Donatuz',
    'ethereum' : 'Ethereum Mainnet',
    'flare' : 'Flare Mainent',
    'fraxtal' : 'Fraxtal',
    'linea' : 'Linea Mainnet',
    'lisk' : 'Lisk',
    'lumia' : 'Lumia Prism',
    'metis' : 'Metis Andromeda Mainnet',
    'op' : 'OP Mainnet',
    'polygonMain' : 'Polygon Mainnet',
    'polygonZK' : 'Polygon zkEVM',
    'rootstock' : 'Rootstock Mainnet',
    'superposition' : 'Superposition',
    'vanar' : 'Vanar Mainnet',
    'xai' : 'Xai Mainnet',
    'zksync' : 'zkSync Mainnet',
}

const networkTokens = {  // Taken from https://thirdweb.com/chainlist/mainnets
    'amoy' : 'POL',
    'arbitrumOne' : 'ETH',
    'avalanche' : 'AVAX',
    'base' : 'ETH',
    'bitcoin' : 'BTC',
    'donatuz' : 'ETH',
    'ethereum' : 'ETH',
    'flare' : 'FLR',
    'fraxtal' : 'frxETH',
    'linea' : 'ETH',
    'lisk' : 'ETH',
    'lumia' : 'LUMIA',
    'metis' : 'METIS',
    'op' : 'ETH',
    'polygonMain' : 'POL',
    'polygonZK' : 'ETH',
    'rootstock' : 'RBTC',
    'superposition' : 'ETH',
    'vanar' : 'VANRY',
    'xai' : 'XAI',
    'zksync' : 'ETH',
}

const tokenValues = {
    'AVAX' : 0,
    'BTC' : 0,
    'ETH' : 0,
    'FLR' : 0,
    'frxETH' : 0,
    'LUMIA' : 0,
    'METIS' : 0,
    'POL' : 0,
    'RBTC' : 0,
    'VANRY' : 0,
    'XAI' : 0,
}

// IDs taken from https://api.coingecko.com/api/v3/coins/list

const url = 'https://api.coingecko.com/api/v3/simple/price?ids=avalanche-wormhole,bitcoin,ethereum,polygon-ecosystem-token,flare-networks,frax-ether,lumia,metis-token,rootstock,vanar-chain,xai&vs_currencies=inr'

async function updateToken() {
    try {
        const response = await fetch(url)
        if (!response.ok){
            console.log('API request failed')
        }
        const data = await response.json()

        tokenValues.AVAX = data['avalanche-wormhole'].inr
        tokenValues.BTC = data['bitcoin'].inr
        tokenValues.ETH = data['ethereum'].inr
        tokenValues.FLR = data['flare-networks'].inr
        tokenValues.frxETH = data['frax-ether'].inr
        tokenValues.LUMIA = data['lumia'].inr
        tokenValues.METIS = data['metis-token'].inr
        tokenValues.POL = data['polygon-ecosystem-token'].inr
        tokenValues.RBTC = data['rootstock'].inr
        tokenValues.VANRY = data['vanar-chain'].inr
        tokenValues.XAI = data['xai'].inr

        console.log(tokenValues)

        updateBalance()

    } catch (error) {
        console.log(error.message)
    }
}

function updateBalance() {
    if(changeNetwork.textContent === 'All Networks'){
        let total = 0
        for(let key in userCoins){
            total += userCoins[key]['amount'] * tokenValues[networkTokens[key]]
        }
        balance.innerHTML = total.toFixed(2).toString()
        balance.innerHTML = '₹ ' + balance.innerHTML
        let livePriceTicker = document.querySelector('#livePriceTicker')
        livePriceTicker.querySelector('h1').textContent = ''
        livePriceTicker.querySelector('h6').textContent = ''
        livePriceTicker.querySelector('p').textContent = ''
    }

    else {
        let buttons = enabledNetworks.querySelectorAll('button')
        for(let button of buttons){
            if(button.textContent === changeNetwork.textContent){
                balance.innerHTML = '₹ ' + (userCoins[button.id]['amount'] * tokenValues[networkTokens[button.id]]).toFixed(2)
                let livePriceTicker = document.querySelector('#livePriceTicker')
                livePriceTicker.querySelector('h1').textContent = 'Live Price :'
                livePriceTicker.querySelector('h6').textContent = 'Gets Updated Every 60 Seconds'
                livePriceTicker.querySelector('p').textContent = '1 ' + networkTokens[button.id] + ' = ₹ ' + tokenValues[networkTokens[button.id]].toFixed(2)
                livePriceTicker.querySelector('p').style['fontSize'] = '25px'
            }
        }
    }

    let coinAmount = Array.from(document.querySelectorAll('.coinAmount'))
    let coinAmountINR = Array.from(document.querySelectorAll('.coinAmountINR'))
    for(let coin of coinAmount){
        coin.innerText = userCoins[coin.id]['amount'] + ' ' + networkTokens[coin.id]
    }

    for(let coin of coinAmountINR){
        coin.innerText = '₹ ' + (userCoins[coin.id]['amount'] * tokenValues[networkTokens[coin.id]]).toFixed(2)
    }
}

setTimeout(updateToken, 1)

setInterval(updateToken, 60000)

const hideNetworkList_ = document.querySelector('#hideNetworkList')
const otherOptions_ = document.querySelector('#otherOptions')
const showChangeName_ = document.querySelector('#showChangeName')
const showPrivateKey_ = document.querySelector('#showPrivateKey')
let sendButton_ = document.querySelector('#sendButton')
let closeSendingDetails_ = document.querySelector('#closeSendingDetails')
let receiveButton_ = document.querySelector('#receiveButton')
let closeReceivingDetails_ = document.querySelector('#closeReceivingDetails')
const hideChangeName_ = document.querySelector('#hideChangeName')
const hidePrivateKey_ = document.querySelector('#hidePrivateKey')

document.addEventListener('click', () => {
    sendButton_ = document.querySelector('#sendButton')
    closeSendingDetails_ = document.querySelector('#closeSendingDetails')
    receiveButton_ = document.querySelector('#receiveButton')
    closeReceivingDetails_ = document.querySelector('#closeReceivingDetails')

    if(sendButton_){
        sendButton_.addEventListener('click', () => {
            sendingWrapper.classList.add('showDetails')
            dimmer.classList.add('overlay')
    })}
    
    if(closeSendingDetails_){
    closeSendingDetails_.addEventListener('click', () => {
        sendingWrapper.classList.remove('showDetails')
        dimmer.classList.remove('overlay')
    })}
    
    if(receiveButton_){
    receiveButton_.addEventListener('click', () => {
        receivingDetails.classList.add('showDetails')
        dimmer.classList.add('overlay')
    })}
    
    if(closeReceivingDetails_){
    closeReceivingDetails_.addEventListener('click', () => {
        receivingDetails.classList.remove('showDetails')
        dimmer.classList.remove('overlay')
    })}
})

if(otherOptions_){
otherOptions_.addEventListener('click', () => {
    let ul = document.querySelector('ul')
    ul.style.scale = (parseInt(ul.style.scale) ^ 1).toString()
})}

if(showChangeName_){
showChangeName_.addEventListener('click', () => {
    changeName.classList.add('showDetails')
    dimmer.classList.add('overlay')
})}

if(hideChangeName_){
hideChangeName_.addEventListener('click', () => {
    if(changeName.querySelector('input').value){
        userName.innerHTML = changeName.querySelector('input').value
        const changeNameRef = doc(db, 'userDetails', userDocID)
        updateDoc(changeNameRef, {
            'name' :  changeName.querySelector('input').value
        })
        changeName.querySelector('input').value = ''
        changeName.classList.remove('showDetails')
        dimmer.classList.remove('overlay')
    }
    else{
        alert('Enter something')
    }
})}

if(showPrivateKey_){
showPrivateKey_.addEventListener('click', () => {
    if(changeNetwork.innerText === 'All Networks'){
        alert('Select a network to view it\'s Private Key')
    }
    else{
        let buttons = enabledNetworks.querySelectorAll('button')
        for(let button of buttons){
            if(button.textContent === changeNetwork.textContent){
                privateKey.querySelector('#privateKeyHex').textContent = userCoins[button.id]['pvtkey']
            }
        }
        privateKey.classList.add('showDetails')
        dimmer.classList.add('overlay')
    }
})}

if(hidePrivateKey_){
hidePrivateKey_.addEventListener('click', () => {
    privateKey.classList.remove('showDetails')
    dimmer.classList.remove('overlay')
})}

if(changeNetwork){
changeNetwork.addEventListener('click', () => {
    networkOptions.classList.add('showDetails')
    dimmer.classList.add('overlay')
})}

if(hideNetworkList_){
hideNetworkList_.addEventListener('click', () => {
    networkOptions.classList.remove('showDetails')
    dimmer.classList.remove('overlay')
})}

addNetworkBtn.forEach((button) => {
    button.addEventListener('click', () => {
        
        let buttonContainer = document.getElementById(button.id)
        let button2 = document.createElement('button')
        let div = document.createElement('div')
        let img = document.createElement('img')

        div.className = 'networkContainer'
        div.id = button.id

        button2.className = "displayNetworkBtn"
        button2.id = button.id
        button2.textContent = buttonContainer.querySelector('span').textContent

        img.src = `../src/${button.id}.png`
        img.className = 'cryptoLogo'

        div.appendChild(img)
        div.appendChild(button2)
        enabledNetworks.appendChild(div)
        availableNetworks.removeChild(buttonContainer)

        userCoins[button2.id] = {}
        userCoins[button2.id]['amount'] = 100
        userCoins[button2.id]['pkh'] = generateHex(40)
        userCoins[button2.id]['pvtkey'] = generateHex(64)

        
        displayNetworkBtn = Array.from(document.querySelectorAll('.displayNetworkBtn'))

        const docRef = doc(db, 'userDetails', userDocID)
        updateDoc(docRef, {
            'network' : userCoins
        })
        .then(() => {
            userDoc.network = userCoins

            updateEventListener()

            updateCoinInfo()

            setTimeout(updateBalance, 1000)

            alert(`Network Added Successfully! You receive 100 ${networkTokens[button.id]} Joining Bonus`)
        })
    })
})

updateCoinInfo()

function updateEventListener() {
    displayNetworkBtn.forEach((button) => {
        button.removeEventListener('click', changeNetworkTextUpdate)
        button.addEventListener('click', changeNetworkTextUpdate)
    });
}

function changeNetworkTextUpdate(event) {
    const button = event.currentTarget;
    changeNetwork.innerHTML = '<img class="cryptoLogo" src>' + button.textContent + '<i class="fa fa-chevron-down"></i>';
    changeNetwork.querySelector('img').src = `../src/${button.id}.png`;

    if(! balanceWrapper.contains(txbuttons)){
        balanceWrapper.appendChild(txbuttons)
    }

    updateBalance()

    const qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = '';

    new QRCode("qrcode", userCoins[button.id]['pkh'])

    userAddress.textContent = userCoins[button.id]['pkh']

    let balancePerCoin = document.getElementById('balancePerCoin')
    let allTx = document.getElementById('allTx')
    let seperator = document.getElementById('seperator')
    seperator.style.scale = '0'
    balancePerCoin.style.scale = '0'
    balancePerCoin.style.opacity = '0'
    balancePerCoin.style.width = '0px'
    balancePerCoin.style.height = '0px'
    balancePerCoin.style.padding = '0px'
    allTx.style.width = '800px'
    allNetworksLeft.style.scale = '0'
    allNetworksLeft.style.opacity = '0'
    allNetworksLeft.style.width = '0px'
    allNetworksLeft.style.height = '0px'
    allNetworksRight.style.width = '800px'
    allNetworksRight.style.padding = '0px'

    let texts = allNetworksRight.querySelectorAll('.noTx')
    if(texts){
        for(let text of texts){
            allNetworksRight.removeChild(text)
        }
    }

    let transaction = document.querySelectorAll('.transaction')
    for(let tx of transaction){
        if(!(button.id + 'Tx' === tx.id)){
            tx.style.opacity = '0'
            tx.style.scale = '0'
            tx.style.height = '0px'
            tx.style.padding = '0px'
        } else{
            tx.style.opacity = '1'
            tx.style.scale = '1'
            tx.style.height = 'auto'
            tx.style.padding = '10px'
        }
    }
    networkOptions.classList.remove('showDetails')
    dimmer.classList.remove('overlay')
}

allNetworks.addEventListener('click', () => {
    changeNetwork.innerHTML = '<img src="" alt="" srcset="" class="cryptoLogo">All Networks<i class="fa fa-chevron-down"></i>'
    if(balanceWrapper.contains(txbuttons)){
        balanceWrapper.removeChild(txbuttons)
    }
    let balancePerCoin = document.getElementById('balancePerCoin')
    let allTx = document.getElementById('allTx')
    let seperator = document.getElementById('seperator')
    seperator.style.scale = '1'
    balancePerCoin.style.scale = '1'
    balancePerCoin.style.opacity = '1'
    balancePerCoin.style.width = '400px'
    balancePerCoin.style.height = '20px'
    balancePerCoin.style.padding = '20px'
    allTx.style.width = '400px'
    allNetworksLeft.style.scale = '1'
    allNetworksLeft.style.opacity = '1'
    allNetworksLeft.style.width = '400px'
    allNetworksLeft.style.height = 'auto'
    allNetworksRight.style.width = '400px'
    allNetworksRight.style.padding = '8px 0px'

    let transaction = document.querySelectorAll('.transaction')
    for(let tx of transaction){
        tx.style.opacity = '1'
        tx.style.scale = '1'
        tx.style.height = 'auto'
        tx.style.padding = '10px'
    }
    updateBalance()
    networkOptions.classList.remove('showDetails')
    dimmer.classList.remove('overlay')
})

function updateCoinInfo(){
    
    displayNetworkBtn = Array.from(document.querySelectorAll('.displayNetworkBtn'))

    let button = displayNetworkBtn[displayNetworkBtn.length - 1]

    let wrapper = document.createElement('div')
    let priceWrapper = document.createElement('div')
    let img = document.createElement('img')
    let text1 = document.createElement('p')
    let text2 = document.createElement('p')
    let text3 = document.createElement('p')

    wrapper.className = 'coinInfo'
    priceWrapper.className = 'priceWrapper'
    
    img.src = `../src/${button.id}.png`
    img.className = 'cryptoLogo'
    text1.innerText = button.textContent
    text2.innerText = userCoins[button.id]['amount'] + ' ' + networkTokens[button.id]
    text3.innerText = '₹ ' + userCoins[button.id]['amount'] * tokenValues[networkTokens[button.id]]

    text2.className = 'coinAmount'
    text2.id = button.id
    text2.style['marginLeft'] = 'auto'

    text3.className = 'coinAmountINR'
    text3.id = button.id
    text3.style['marginLeft'] = 'auto'

    priceWrapper.appendChild(text2)
    priceWrapper.appendChild(text3)
    priceWrapper.style['margin-left'] = 'auto'
    wrapper.appendChild(img)
    wrapper.appendChild(text1)
    wrapper.appendChild(priceWrapper)

    allNetworksLeft.appendChild(wrapper)
}

if (userName && userAddress && balance){

    userAddress.addEventListener('click', () => {
        const textArea = document.createElement('textarea')
        document.body.appendChild(textArea)
        textArea.value = userAddress.innerHTML
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Address Copied')
    })
}

let sendTokens = sendingWrapper.querySelector('#sendTokens')
sendTokens.addEventListener('submit', (e) => {
    e.preventDefault()
    let val = parseFloat(sendTokens.amt.value)
    if(!sendTokens.address.value){
        alert('Please enter address')
    }
    else if(val === '' || val < 0 || isNaN(val) ){
        alert('Please enter a valid amount')
    }
    else{
        let buttons = enabledNetworks.querySelectorAll('button')
        for(let button of buttons){
            if(button.textContent === changeNetwork.textContent){
                if(userCoins[button.id]['amount'] < val){
                    alert('Amount entered more than the coins in network')
                }
                else{

                    userCoins[button.id]['amount'] -= val

                    const sendDocRef = doc(db, 'userDetails', userDocID)

                    updateDoc(sendDocRef, {
                        'network' : userCoins
                    })

                    let div = document.createElement('div')
                    div.className = 'transaction'
                    div.id = button.id + 'Tx'
                    
                    let txWrapper = document.createElement('div')
                    let nameWrapper = document.createElement('div')
                    txWrapper.className = 'txWrapper'
                    nameWrapper.className = 'nameWrapper'

                    let text1 = document.createElement('p')
                    let text2 = document.createElement('p')
                    let text3 = document.createElement('p')
                    let text4 = document.createElement('p')
                    let text5 = document.createElement('p')

                    text1.textContent = 'Pending...'
                    text2.textContent = val + ' ' + networkTokens[button.id]
                    text3.textContent = '₹ ' + (val * tokenValues[networkTokens[button.id]]).toFixed(2).toString()
                    text4.textContent = sendTokens.address.value + ' (' + button.textContent + ')'
                    const now = new Date();
                    text5.textContent = now.toLocaleString()

                    text1.className = 'text1'
                    text2.className = 'text2'
                    text3.className = 'text3'
                    text4.className = 'text4'
                    text5.className = 'text5'

                    txWrapper.appendChild(text2)
                    txWrapper.appendChild(text3)

                    nameWrapper.appendChild(text1)
                    nameWrapper.appendChild(text4)
                    nameWrapper.appendChild(text5)

                    div.appendChild(nameWrapper)
                    div.appendChild(txWrapper)

                    allNetworksRight.insertBefore(div, allNetworksRight.firstChild)

                    sendingWrapper.classList.remove('showDetails')
                    dimmer.classList.remove('overlay')

                    let addressCheck = 0

                    getDocs(userDetailsRef)
                    .then((snapshot) => {
                        snapshot.docs.forEach((doc_) => {
                            if(button.id in doc_.data().network){
                                console.log(doc_.data()['network'][button.id]['pkh'])
                                console.log(sendTokens.address.value)
                                console.log(doc_.data()['network'][button.id]['pkh'] === sendTokens.address.value)
                                if(doc_.data()['network'][button.id]['pkh'] === sendTokens.address.value){
                                    addressCheck = 1
                                    let txObject = {
                                        'network' : button.id,
                                        'fromPKH' : userCoins[button.id]['pkh'],
                                        'toPKH' : sendTokens.address.value,
                                        'amount' : val,
                                        'amountINR' : val * tokenValues[networkTokens[button.id]],
                                        'time' : now,
                                        'status' : 1,
                                    }

                                    addDoc(transactionsRef, txObject)
                                    .then(() => {

                                        let receiverID

                                        getID(doc_.data().email).then((ID) => {
                                            receiverID = ID
                                            let receiverNetwork = doc_.data().network
                                            receiverNetwork[button.id]['amount'] += val
                                            const receiverDocRef = doc(db, 'userDetails', receiverID)
                                            updateDoc(receiverDocRef, {
                                                'network' : receiverNetwork
                                            })
                                            .then(() => {
                                                text1.textContent = 'Sent'
                                                sendTokens.reset()
                                            })
                                            .catch((err) => {
                                                console.log(err.message)
                                            })
                                        })
                                    })
                                    .catch((err) => {
                                        console.log(err.message)
                                    })
                                }
                            }
                        })
                        if(!addressCheck){
                            let txObject = {
                                'network' : button.id,
                                'fromPKH' : userCoins[button.id]['pkh'],
                                'toPKH' : sendTokens.address.value,
                                'amount' : val,
                                'amountINR' : val * tokenValues[networkTokens[button.id]],
                                'time' : now,
                                'status' : 0,
                            }

                            addDoc(transactionsRef, txObject)

                            text1.textContent = 'Failed'
                            sendTokens.reset()
                        }
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
                    updateBalance()
                }
            }
        }
    }
})
