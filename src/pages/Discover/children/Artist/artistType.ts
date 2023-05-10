// export const artistType = [
//     { name: '全部', type: -1, area: -1, all: true },
//     { name: '华语', type: -1, area: 7, all: true },
//     { name: '华语男歌手', type: 1, area: 7 },
//     { name: '华语女歌手', type: 2, area: 7 },
//     { name: '华语组合', type: 3, area: 7 },
//     { name: '欧美', type: -1, area: 96, all: true },
//     { name: '欧美男歌手', type: 1, area: 96 },
//     { name: '欧美女歌手', type: 2, area: 96 },
//     { name: '欧美组合', type: 3, area: 96 },
//     { name: '日本', type: -1, area: 96, all: true },
//     { name: '日本男歌手', type: 1, area: 8 },
//     { name: '日本女歌手', type: 2, area: 8 },
//     { name: '日本组合', type: 3, area: 8 },
// ]
// 接口
import type { ArtistAreaType, ArtistType } from '@/api/public/indexfaces';

export const artistTypes: { name: string, value: ArtistType }[] = [
    { name: '全部', value: -1 },
    { name: '男歌手', value: 1 },
    { name: '女歌手', value: 2 },
    { name: '乐队', value: 3 }
]

export const areaTypes: { name: string, value: ArtistAreaType }[] = [
    { name: '全部', value: -1 },
    { name: '华语', value: 7 },
    { name: '欧美', value: 96 },
    { name: '日本', value: 8 },
    { name: '韩国', value: 16 },
    { name: '其他', value: 0 }
]

export const wordTypes: { name: string; value: string | number }[] = [
    { name: '热门', value: -1 },
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'C', value: 'C' },
    { name: 'D', value: 'D' },
    { name: 'E', value: 'E' },
    { name: 'F', value: 'F' },
    { name: 'G', value: 'G' },
    { name: 'H', value: 'H' },
    { name: 'I', value: 'I' },
    { name: 'J', value: 'J' },
    { name: 'K', value: 'K' },
    { name: 'L', value: 'L' },
    { name: 'M', value: 'M' },
    { name: 'N', value: 'N' },
    { name: 'O', value: 'O' },
    { name: 'P', value: 'P' },
    { name: 'Q', value: 'Q' },
    { name: 'R', value: 'R' },
    { name: 'S', value: 'S' },
    { name: 'T', value: 'T' },
    { name: 'U', value: 'U' },
    { name: 'V', value: 'V' },
    { name: 'W', value: 'W' },
    { name: 'X', value: 'X' },
    { name: 'Y', value: 'Y' },
    { name: 'Z', value: 'Z' },
    { name: '其他', value: 0 },
]