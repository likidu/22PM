export interface RefreshTokenType {
    'x-jike-access-token': string
    success: 'true' | 'false'
    'x-jike-refresh-token': string
}

interface Image {
    picUrl: string
    largePicUrl: string
    middlePicUrl: string
    smallPicUrl: string
    thumbnailUrl: string
}

export interface Mobile {
    mobilePhoneNumber: string
    areacode: string
    verifyCode?: string
}

export interface User {
    type: 'USER'
    uid: string
    avatar: {
        picture: Image
    }
    nickname: string
    isNicknameSet: boolean
    authorship: []
    isCancelled: boolean
    // readTrackInfo: {}
    phoneNumber: Mobile
    phoneNumberNeeded: boolean
    isInvited: boolean
}

export interface PodcastType {
    type: 'PODCAST'
    pid: string
    title: string
    author: string
    description: string
    subscriptionCount: number
    image: Image
    color: {
        light: string
        dark: string
    }
    episodeCount: number
}

export interface EpisodeType {
    type: 'EPISODE'
    eid: string
    pid: string
    title: string
    subtitle: string
    shownotes: string
    image: Image
    duration: number
    podcast: PodcastType
    isPlayed: boolean
    isFinished: boolean
    isFavorited: boolean
    mediaKey: string
}

interface Comment {
    id: string
}

interface Pick {
    episode: EpisodeType
    comment: Comment
}

export interface EditorPick {
    date: string
    picks: Pick[]
}
