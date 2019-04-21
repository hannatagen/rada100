<template>
    <div id="langContainer">
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Keele- ja sisuhaldus</span>
        </nav>
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
                    'See on oluline, et vältida rakenduses (näiteks nuppude tekstides) tühjasid väärtuseid.'
                ],
                translationsList: [],
                components: [],
                languages: [],
                id: null,
                opened: null,
                selectedLang: 'eesti',
                emptyInputFields: {},
                changed: {},
                addLangClicked: false,
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
                    const translationsBase = this.translationsList.filter(translation => translation.lang === 'eesti' && translation.component === component);
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

                return this.translationsList.filter(translation => translation.lang === lang && translation.component === component)
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
                            this.$refs[element.langId][0].placeholder = this.$refs[element.langId][0].value;
                            this.$refs[element.langId][0].value = '';
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
                this.loadTranslations();
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
                for (let i = 0; i < elements.length; i++) {
                    let ref = elements[i].langId;
                    if (this.$refs[ref][0].value !== '') {
                        let apiUrl = '/api/language/update/' + ref;
                        let notificationSuccessText = 'Andmed edukalt salvestatud!';
                        AXIOS.post(apiUrl, {
                            name: elements[i].name,
                            lang: elements[i].lang,
                            translation: this.$refs[ref][0].value,
                            component: elements[i].component,
                            textarea: elements[i].textarea,
                        })
                            .then(request => {
                                const elementIndexOfList = this.translationsList.map(function(e) { return e.langId; }).indexOf(ref);
                                this.translationsList[elementIndexOfList].langId = request.data;
                                this.$refs[ref][0].placeholder = this.$refs[ref][0].value;
                                this.$refs[ref][0].value = '';
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
                        if (saveSuccess) {
                            this.$notify({
                                group: 'foo',
                                title: 'Teavitus',
                                text: notificationSuccessText
                            });
                        }
                    }
                }
                this.loadTranslations();
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

    .langForm {
        overflow-x: scroll;
        padding: 0.2em;
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


    @media only screen and (max-width: 700px) {
        #accordion {
            margin-right: unset;
        }
    }
</style>
