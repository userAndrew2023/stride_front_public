<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

type ResultSuggestion = {
    title: {
        text: string
    },
    subtitle?: {
        text: string
    },
    tags: string[],
    distance: {
        value: string,
        text: string
    }
}

function formattedSubtitle(subtitle?: { text: string }) {
    if (!subtitle) {
        return '';
    }
    let splittedText = subtitle.text.split(" · ");
    if (splittedText.length > 1) {
        return splittedText[splittedText.length - 1]
    }
    return subtitle.text;
}

// eslint-disable-next-line no-undef
let props = defineProps(["text", "last"])
const text = ref(props.text);
const last = ref(props.last)
// eslint-disable-next-line no-undef
let emits = defineEmits(["clickSuggestion"]);

const suggestions = ref<ResultSuggestion[]>([])

async function getSuggestions() {
    await axios.get("http://192.168.0.102/suggest/?text=" + text.value)
    .then((response) => {
        suggestions.value = response.data['results'];
    })
}


if (text.value.length > 0 && text.value != last.value) {
    getSuggestions()
}

</script>

<template>
    <div v-for="(item, index) in suggestions" :key="index">
        <div class="suggestion" @click="emits('clickSuggestion', item.subtitle ? item.title.text + ', ' + item.subtitle.text : item.title.text)">
            <div class="main_suggestion">
                {{ item.title.text }}
            </div>
            <div class="additional_suggestion">
                {{ formattedSubtitle(item.subtitle) }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.suggestion {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-size: 12px;
    transition: .1s;
}
.suggestion:hover {
    background-color: #cccccc;
    cursor: pointer;
}
.main_suggestion {
    font-weight: 700;
    text-align: left;
}
.additional_suggestion {
    text-align: right;
}
</style>