<template>
    <li class="artist-infor" v-once>

        <div class="artist-cover" @click="toArtistInfor">
            <img :src="picUrl + '?param=500y500'">
            <div class="artist-icon-box">
                <div class="artist-icon">
                    <n-icon color="#fff" size="50">
                        <UserSwitchOutlinedIcon />
                    </n-icon>
                </div>
            </div>
        </div>

        <n-ellipsis :tooltip="false">
            <span style="font-size: 17px;font-weight: 600;">
                {{ name }}
            </span>
        </n-ellipsis>

        <div class="artist-more">
            <slot></slot>
        </div>

    </li>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { UserSwitchOutlined as UserSwitchOutlinedIcon } from '@vicons/antd'
interface ArtistProps {
    id: number;
    name: string;
    picUrl: string;
}
const props = defineProps<ArtistProps>()
const $router = useRouter()

function toArtistInfor() {
    $router.push(`/artist/${props.id}`)
}
</script>
<style scoped lang="scss">
li {
    text-align: center;
    user-select: none;
}

.artist-cover {
    min-height: 25vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;

    img {
        box-shadow: 0 0 10px var(--box-shadow);
        width: 100%;
        border-radius: 50%;
        transition: .5s;
    }
}

.artist-cover:hover {
    img {
        transform: scale(1.05);
    }
}


.artist-icon-box {
    transition: .5s;
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgba(0, 0, 0, 0.197);
    display: none;
}

.artist-icon-box:hover {
    transform: scale(1.05);
}

.artist-cover:hover .artist-icon-box {
    display: flex;
}


.artist-cover:hover .artist-icon {
    animation: icon .5s 1 ease-in-out;
}

@keyframes icon {
    from {
        opacity: 0;
        transform: scale(.5);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>