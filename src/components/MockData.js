import _ from 'lodash'

const imageNames = [
    'WandaHoward',
    'TimDeboer',
    'RobinCounts',
    'RobertTolbert',
    'MonaKane',
    'MiguelGarcia',
    'MauricioAugust',
    'LydiaBauer',
    'KristinPatterson',
    'KevinSturgis',
    'KatriAthokas',
    'KatLarsson',
    'JohnieMcConnell',
    'IsaacFielder',
    'HenryBrill',
    'ErikNason',
    'ElviaAtkins',
  ];

export const getAllMockEmojis = () => _.map(imageNames, imageName => (
    {
        id: imageName,
        name: imageName, 
        src: `https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/${imageName}.jpg`
    }
  ))