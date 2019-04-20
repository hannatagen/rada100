<template>
    <div id="langContainer">
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Keele- ja sisuhaldus</span>
        </nav>
        <p>
            <i class="fas fa-lightbulb lightBulbCustom"></i>
            Keeleelementide nägemiseks ja muutmiseks, vali esmalt sobiv komponent.
        </p>
        <p>
            <i class="fas fa-lightbulb lightBulbCustom"></i>
            Tekstiväljade suurust, mis ulatuvad üle mitme rea, on võimalik paremast alt nurgast
            muuta.
        </p>
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
                     class="collapse"
                     :aria-labelledby="component"
                     data-parent="#accordion">
                    <div class="card-body">
                        <button v-for="language in languages"
                                :key="language"
                                v-b-tooltip.hover
                                type="button"
                                class="btn btn-primary btn-sm langBtn"
                                title="Vaheta keelt"
                                @click="selectedLang = language">
                            {{ language }}
                        </button>
                        <button v-b-tooltip.hover
                                type="button"
                                class="btn btn-primary btn-sm langBtn plusBtn"
                                title="Lisa keel">
                            <i class="fas fa-plus"></i>
                        </button>
                        <form   :id="component + 'Form'"
                                class="langForm">
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
                translationsList: [],
                components: [],
                languages: [],
                id: null,
                opened: null,
                selectedLang: 'eesti',
                emptyInputFields: {},
                changed: {},
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
            saveData(elements) {
                for (let i = 0; i < elements.length; i++) {
                    let ref = elements[i].langId;
                    if (this.$refs[ref][0].value !== '') {
                        AXIOS.post('/api/language/update/' + ref, {
                            name: elements[i].name,
                            lang: elements[i].lang,
                            translation: this.$refs[ref][0].value,
                            component: elements[i].component,
                            textarea: elements[i].textarea,
                        })
                            .then(request => {
                                // console.log(this.translationsList);
                                const elementIndexOfList = this.translationsList.map(function(e) { return e.langId; }).indexOf(ref);
                                this.translationsList[elementIndexOfList].langId = request.data;
                                this.$refs[ref][0].placeholder = this.$refs[ref][0].value;
                                this.$refs[ref][0].value = '';
                                this.$notify({
                                    group: 'foo',
                                    title: 'Teavitus',
                                    text: 'Andmed edukalt salvestatud!'
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                this.$notify({
                                    group: 'foo',
                                    type: 'warn',
                                    title: 'Teavitus',
                                    text: 'Midagi läks valesti. Proovi mõne aja pärast uuesti.'
                                });
                            })
                    }
                }

                AXIOS.get('/api/language/')
                    .then(response => {
                        // JSON responses are automatically parsed.
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
            AXIOS.get('/api/language/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    const translations = response.data;
                    this.translationsData(translations);
                })
                .catch(error => {
                    //eslint-disable-next-line
                    console.log(error)
                });
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
    }

    @media only screen and (max-width: 700px) {
        #accordion {
            margin-right: unset;
        }
    }
</style>
