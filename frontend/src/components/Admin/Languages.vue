<template>
    <div id="langContainer">
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Keele- ja sisuhaldus</span>
        </nav>
        <div v-if="kkkQuestionsOpened">
            <form id="kkkForm">
                <p v-for="tip in kkkTips" :key="tip">
                    <i class="fas fa-lightbulb lightBulbCustom"></i>
                    {{ tip }}
                </p>
                <div class="kkkSaveCancelBtnGroup">
                    <button class="btn btnGreen langBtnGroup"
                            @click="saveData(getKKKData(selectedLang))"
                    >
                        Salvesta
                    </button>
                    <button class="btn btn-danger langBtnGroup"
                            @click="[resetFields('kkkForm'), kkkQuestionsOpened = false]"
                    >
                        Katkesta
                    </button>
                </div>
                <div    class="mb-3 langButtonsGroup kkkSaveCancelBtnGroup"
                >
                    <button v-for="language in languages"
                            :key="language"
                            v-model="languages"
                            v-b-tooltip.hover
                            type="button"
                            class="btn btn-primary btn-sm langBtn"
                            title="Vaheta keelt"
                            @click="[selectedLang = language, addLangClicked = false]">
                        {{ language }}
                    </button>
                </div>
                <button @click="addQA"
                        class="btn btnGreen questionsBtn"
                        v-b-tooltip.hover
                        title="Lisa küsimus ja vastus"
                >
                    Uus küsimus
                    <i class="fas fa-plus"></i>
                </button>
                <div    v-for="element in getKKKData(selectedLang)"
                        :key="element.langId"
                >
                    <div class="input-group langTextAreaGroup inputField"
                    >
                        <div class="input-group-prepend">
                            <span class="input-group-text kkkText">{{separateQA(element.name)[0]}}</span>
                        </div>
                        <textarea class="form-control langTextArea"
                                  :ref="element.langId + 'Q'"
                                  aria-label="textarea"
                                  :placeholder="separateQA(element.translation)[0]">
                    </textarea>
                    </div>
                    <div class="input-group langTextAreaGroup inputField"
                    >
                        <div class="input-group-prepend">
                            <span class="input-group-text kkkText">{{separateQA(element.name)[1]}}</span>
                        </div>
                        <textarea class="form-control langTextArea kkkAswer"
                                  :ref="element.langId + 'A'"
                                  aria-label="textarea"
                                  :placeholder="separateQA(element.translation)[1]">
                        </textarea>
                    </div>
                    <br>
                    <hr>
                </div>
            </form>
        </div>
        <div v-else>
            <p v-for="tip in tips" :key="tip">
                <i class="fas fa-lightbulb lightBulbCustom"></i>
                {{ tip }}
            </p>
            <div class="mb-3 langButtonsGroup addLangGroup"
            >
                <button v-b-tooltip.hover
                        id="newLangBtn"
                        type="button"
                        class="btn btn-primary btn-sm langBtn plusBtn"
                        title="Lisa keel"
                        data-toggle="collapse"
                        data-target="#newLanguage"
                        aria-expanded="true"
                        aria-controls="newLanguage"
                >
                    Lisa keel
                    <i class="fas fa-plus"></i>
                </button>
                <div id="newLanguage"
                     class="collapse mb-3 langButtonsGroup"
                     aria-labelledby="newLangBtn"
                     data-parent="#newLangBtn"
                >
                    <input  id="newLangInput"
                            ref="newLanguage"
                            class="form-control"
                            type="text"
                            aria-label="language"
                    />
                    <button class="btn btnGreen btn-sm langBtn plusBtn"
                            @click="addLang"
                    >
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            </div>
            <div id="accordion">
                <div class="card languageCard"
                     v-for="component in components"
                     :key="component">
                    <div class="card-header languageHeader"
                         :id="component"
                         data-toggle="collapse"
                         :data-target="'#' + component + 'Body'"
                         aria-expanded="true"
                         :aria-controls="component + 'Body'"
                         @click="markCardOpened(component)"
                    >
                        <h6 class="mb-0 languageTitle">
                            {{ component.split('_').join(' ').toUpperCase() }}
                            <i  v-if="opened === component"
                                class="fas fa-chevron-up"></i>
                            <i  v-else
                                class="fas fa-chevron-down"></i>
                        </h6>
                    </div>

                    <div :id="component + 'Body'"
                         class="collapse cardBodyCollapsed"
                         :aria-labelledby="component"
                         data-parent="#accordion"
                    >
                        <div class="card-body">
                            <form   :id="component + 'Form'"
                                    class="langForm">
                                <div    class="mb-3 langButtonsGroup"
                                >
                                    <button v-for="language in languages"
                                            :key="language"
                                            v-model="languages"
                                            v-b-tooltip.hover
                                            type="button"
                                            class="btn btn-primary btn-sm langBtn"
                                            title="Vaheta keelt"
                                            @click="[selectedLang = language, addLangClicked = false]">
                                        {{ language }}
                                    </button>
                                </div>
                                <button v-if="component === 'kkk'"
                                        @click="kkkQuestionsOpened = true"
                                        class="btn btnGreen questionsBtn"
                                        v-b-tooltip.hover
                                        title="Muuda küsimusi ja vastuseid"
                                >
                                    Küsimused
                                </button>
                                <div    v-for="element in getLanguageTranslationsOfComponent(selectedLang, component.split('_').join(' '))"
                                        :key="element.langId">
                                    <div v-if="!element.textarea"
                                         class="input-group mb-3 inputField">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroup-sizing-default">{{element.name}}</span>
                                        </div>
                                        <input type="text"
                                               class="form-control"
                                               :ref="element.langId"
                                               aria-label="input"
                                               aria-describedby="inputGroup-sizing-default"
                                               :placeholder="element.translation"
                                        >

                                    </div>
                                    <div    v-else
                                            class="input-group langTextAreaGroup inputField">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">{{element.name}}</span>
                                        </div>
                                        <textarea class="form-control langTextArea"
                                                  :ref="element.langId"
                                                  aria-label="textarea"
                                                  :placeholder="element.translation">
                                        </textarea>
                                    </div>
                                </div>
                                <button class="btn btnGreen langBtnGroup"
                                        @click="saveData(getLanguageTranslationsOfComponent(selectedLang, component.split('_').join(' ')))"
                                >
                                    Salvesta
                                </button>
                                <button class="btn btn-danger langBtnGroup"
                                        @click="resetFields(component + 'Form')"
                                >
                                    Tühista
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AXIOS} from './.././http-common'

    export default {
        name: "Languages",
        props: ['value'],
        data() {
            return {
                tips: [
                    'Keeleelementide nägemiseks ja muutmiseks vali esmalt sobiv komponent.',
                    'Tekstiväljade suurust, mis ulatuvad üle mitme rea, on võimalik paremalt alt nurgast muuta.',
                    'Lisades uut keelt salvestatakse andmebaasi esmalt kõik uue keele ' +
                    'keeleelementide tõlkeväärtused vaikekeele väärtusega. Antud juhul on selleks eesti keel. ' +
                    'See on oluline, et vältida rakenduses (näiteks nuppude tekstides) tühjasid väärtuseid.',
                    'Keelt vahetades, salvesta esmalt sisestatud info.'
                ],
                kkkTips: ['Uut keelt saab lisada Keele- ja sisuhalduse pealehelt. Uue keele lisamisel lisatakse uue keele ' +
                'tõlkeelemendid kõikidele sisuelementidele üle rakenduse.'],
                translationsList: [],
                components: [],
                languages: [],
                id: null,
                opened: null,
                selectedLang: 'eesti',
                emptyInputFields: {},
                changed: {},
                addLangClicked: false,
                kkkQuestionsOpened: false,
            };
        },
        methods: {
            translationsData(data) {
                this.translationsList = data;
                this.components = this.getComponentsList(data);
                this.languages = this.getLanguagesList(data);
            },
            getComponentsList(data) {
                let componentNames = [];
                for (let i = 0; i < data.length; i++) {
                    componentNames.push(data[i].component.split(' ').join('_'))
                }
                return [...new Set(componentNames)].sort()
            },
            getLanguagesList(data) {
                let languages = [];
                for (let i = 0; i < data.length; i++) {
                    languages.push(data[i].lang)
                }
                return [...new Set(languages)].sort()
            },
            getLanguageTranslationsOfComponent(lang, component) {
                if (this.addLangClicked) {
                    const translationsBase = this.translationsList.filter(translation => translation.lang === 'eesti' && translation.component === component && translation.name !== 'küsimus:::vastus');
                    let newLangList = [];

                    for (let i = 0; i < translationsBase.length; i++) {
                        const element = translationsBase[i];
                        let newElement = {
                            name: element.name,
                            lang: this.$refs.newLanguage[0].value,
                            langId: this.$refs.newLanguage[0].value + element.langId,
                            translation: '',
                            component: element.component,
                            textarea: element.textarea
                        };
                        newLangList.push(newElement);
                    }

                    return newLangList.sort(function (a,b) {
                            let elementA = a,
                                elementB = b;
                            if (elementA.name < elementB.name) return -1;
                            if (elementA.name > elementB.name) return 1;
                            return 0;
                        });
                }

                return this.translationsList.filter(translation => translation.lang === lang && translation.component === component && translation.name !== 'küsimus:::vastus')
                    .sort(function (a,b) {
                        let elementA = a,
                            elementB = b;
                        if (elementA.name < elementB.name) return -1;
                        if (elementA.name > elementB.name) return 1;
                        return 0;
                    });
            },
            markCardOpened(component) {
                if (this.opened === component) {
                    this.opened = null;
                } else {
                    this.opened = component;
                }
            },
            resetFields(formId) {
                document.getElementById(formId).reset();
            },
            addLang() {
                let saveSuccess = true;
                const languageElements = this.translationsList.filter(translation => translation.lang === 'eesti');
                const apiUrl = '/api/language/';
                const notificationSuccessText = 'Uus keel lisatud.';

                for (let i = 0; i < languageElements.length; i++) {
                    const element = languageElements[i];
                    let newElement = {
                        name: element.name,
                        lang: this.$refs.newLanguage.value,
                        translation: element.translation,
                        component: element.component,
                        textarea: element.textarea
                    };

                    AXIOS.post(apiUrl, newElement)
                        .then(request => {
                            this.loadTranslations();
                        })
                        .catch(error => {
                            console.log(error);
                            saveSuccess = false;
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Teavitus',
                                text: 'Midagi läks valesti. Proovi mõne aja pärast uuesti. ('+ newElement.component + ': ' + newElement.name +')'
                            });
                        });
                }
                if (saveSuccess) {
                    this.$notify({
                        group: 'foo',
                        title: 'Teavitus',
                        text: notificationSuccessText
                    });
                }
            },
            saveData(elements) {
                let saveSuccess = true;
                let notificationSuccessText = 'Andmed edukalt salvestatud!';

                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    let value = '';
                    const ref = element.langId;
                    const refQ = element.langId + 'Q';
                    const refA = element.langId + 'A';

                    if (element.name === 'küsimus:::vastus') {
                        value = this.$refs[refQ]["0"].value + ':::' + this.$refs[refA]["0"].value
                    } else {
                        value = this.$refs[ref]["0"].value;
                    }

                    if (value !== '' && value !== ':::') {
                        let apiUrl = '/api/language/update/' + element.langId;
                        AXIOS.post(apiUrl, {
                            name: element.name,
                            lang: element.lang,
                            translation: value,
                            component: element.component,
                            textarea: element.textarea,
                        })
                            .then(request => {
                                this.loadTranslations();
                            })
                            .catch(error => {
                                console.log(error);
                                saveSuccess = false;
                                this.$notify({
                                    group: 'foo',
                                    type: 'error',
                                    title: 'Teavitus',
                                    text: 'Midagi läks valesti. Proovi mõne aja pärast uuesti. ('+ elements[i].name +')'
                                });
                            });
                    }
                }
                if (saveSuccess) {
                    this.$notify({
                        group: 'foo',
                        title: 'Teavitus',
                        text: notificationSuccessText
                    });
                }
            },
            loadTranslations() {
                AXIOS.get('/api/language/')
                    .then(response => {
                        const translations = response.data;
                        this.translationsData(translations);
                    })
                    .catch(error => {
                        //eslint-disable-next-line
                        console.log(error)
                    });
            },
            getKKKData(lang) {
                return this.translationsList.filter(translation => translation.lang === lang && translation.component === 'kkk' && translation.name === 'küsimus:::vastus')
                    .sort(function (a,b) {
                        let elementA = a,
                            elementB = b;
                        if (elementA.name < elementB.name) return -1;
                        if (elementA.name > elementB.name) return 1;
                        return 0;
                    }).reverse();
            },
            separateQA(input) {
                return input.split(':::');
            },
            addQA() {
                const qaList = this.getKKKData('eesti');
                const element = qaList[0];
                const apiUrl = '/api/language/';
                const notificationSuccessText = 'Uus küsimus lisatud.';
                let saveSuccess = true;
                const newQA = {
                    name: element.name,
                    lang: this.selectedLang,
                    translation: '',
                    component: 'kkk',
                    textarea: true,
                };

                AXIOS.post(apiUrl, newQA)
                    .then(request => {
                        this.loadTranslations();
                        this.$notify({
                            group: 'foo',
                            title: 'Teavitus',
                            text: notificationSuccessText
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        saveSuccess = false;
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: 'Teavitus',
                            text: 'Midagi läks valesti. Proovi mõne aja pärast uuesti.'
                        });
                    });
            }
        },
        mounted() {
            this.loadTranslations();
        },
    }
</script>

<style scoped>
    #langContainer {
        text-align: left;
        margin-bottom: 4em !important;
    }

    #langContainer p {
        margin-left: 1em;
        margin-top: 1em;
    }

    #accordion {
        margin-left: 1em;
        margin-right: 1em;
        text-align: left;
    }

    .languageCard {
        margin-bottom: 0.5em;
    }

    .languageHeader {
        cursor: pointer;
    }

    .languageTitle {
        color: darkgreen;
        font-weight: bold;
    }

    .langBtn {
        margin-right: 0.8em;
        margin-bottom: 1em;
        min-width: 2.2em;
        border-radius: 100px;
    }

    .langBtnGroup {
        margin-right: 1em;
    }

    .langTextAreaGroup {
        margin-bottom: 1em !important;
    }

    .langTextArea {
        min-height: 4em;
    }

    .lightBulbCustom {
        color: gold;
        font-size: 1.4em;
        margin-right: 0.5em;
    }

    .inputField {
        min-width: 30em;
    }

    .langForm,
    #kkkForm {
        overflow-x: scroll;
        padding: 0.2em;
    }

    #kkkForm {
        margin-left: 1em;
        margin-right: 1em;
    }

    #newLanguage {
        max-width: 7em;
    }

    #newLangInput {
        margin-right: 1em !important;
    }

    .langButtonsGroup {
        display: -webkit-box;
    }

    .addLangGroup {
        margin-left: 1em;
    }

    .questionsBtn {
        margin-bottom: 1em;
    }

    .kkkSaveCancelBtnGroup {
        margin-right: 1em;
        margin-top: 1em;
    }

    .kkkText {
        min-width: 6em;
    }

    .kkkAswer {
        min-height: 10em;
    }

    @media only screen and (max-width: 700px) {
        #accordion {
            margin-right: unset;
        }
    }

</style>
