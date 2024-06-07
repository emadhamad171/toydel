import {IMockedCategory} from "./types";

export const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/testotp-fabeb.appspot.com/o/noPhotoMini.png?alt=media&token=c137400e-6b63-493e-83ac-d9fab4873ef4';
export const mockCategory : IMockedCategory = {
    "Конструктори": {
        name: 'Конструктори',
        iconName: 'mdi:lego',
        gradientColors: ['#8B78FF', '#5451D6'],
        iconColor: '#7266EC',
        headerColor: '#fff',
    }
    ,
    "Розвиваючі": {
        headerColor: '#000',
        name: 'Розвиваючі',
        iconName: 'icon-park-outline:cube',
        gradientColors: ['#B1EEFF', '#29BAE2'],
        iconColor: '#49ccef'
    }
    ,
    "М'які": {
        name: 'Мʼякі',
        iconName: 'mingcute:bear-fill',
        gradientColors: ['#78FFD7', '#51D67E'],
        iconColor: '#64EAA9',
        headerColor: '#000',
    }
    ,
    "Електронні": {
        name: 'Електронні',
        iconName: 'teenyicons:robot-solid',
        gradientColors: ['#FFE978', '#D69151'],
        iconColor: '#d6ac51',
        headerColor: '#fff',
    }
    ,
    "Ляльки": {
        name: 'Ляльки',
        iconName: 'mingcute:toy-horse-fill',
        gradientColors: ['#8B78FF', '#5451D6'],
        iconColor: '#7266EC',
        headerColor: '#fff',
    }
    ,
    "Машинки": {
        name: 'Машинки',
        iconName: 'material-symbols:toys',
        gradientColors: ['#B1EEFF', '#29BAE2'],
        iconColor: '#49ccef',
        headerColor: '#000',
    }
    ,
    "Для пісочниці": {
        name: 'Для пісочниці',
        iconName: 'file-icons:sandbox',
        gradientColors: ['#FFE978', '#D69151'],
        iconColor: '#d6ac51',
        headerColor: '#fff',
    }
}
