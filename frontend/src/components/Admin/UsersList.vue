<template>
    <div id="userListContainer">
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
        <span class="navbar-brand">Mängijate nimekiri</span>
        </nav>
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button id="sendMailBtn"
                    v-b-tooltip.hover
                    @click="sendMail"
                    :disabled="!allSelected"
                    class="navbarBtn btn btn-primary"
                    title="Saada valitud kasutajatele email."
                    mailto="selectedEmails">Saada kiri</button>
            <button v-b-tooltip.hover
                    v-confirm="{
                        ok: dialog => deleteUsers(),
                        okText: 'Kustuta',
                        cancelText: 'Katkesta',
                        backdropClose: true,
                        customClass: 'mainConfirm',
                        message: 'Valitud kasutajad kustutatakse jäädavalt. Kas soovite jätkata?'}"
                    :disabled="!allSelected"
                    class="navbarBtn btn btn-danger"
                    title="Kustuta valitud kasutajad.">Kustuta</button>
        </nav>
        <br>
        <div class="usersTableContainer container">
            <input v-model="search" class="form-control" placeholder="Otsi...">
            <div class="tableDiv">
                <table class="adminTable table table-hover sortable">
                    <thead id="userTableHead">
                    <tr>
                        <th>ID</th>
                        <th>
                            <a class="tableColumnTitle" href="#" @click="sortByName">
                                Kasutajanimi
                                <i class="fas fa-arrows-alt-v"></i>
                            </a>
                        </th>
                        <th>Email</th>
                        <th  class="selectionTableCell"
                             @click="checkAll">
                                <span   v-if="!allSelected"
                                        class="btn btnGreen selectionBtn">Vali kõik</span>
                                <span   v-else
                                        class="btn btnGreen selectionBtn">Tühista valik</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in usersList" :key="user.userId">
                        <td>{{ usersList.indexOf(user) + 1 }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td class="selectionTableCell">
                            <input  v-model="selected"
                                    :value="user.userId"
                                    aria-label="Select"
                                    type="checkbox"
                                    id="customCheck1">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: "UsersList",
        data() {
            return {
                usersListOriginal: [],
                usersList: [],
                selected: [],
                sortKey: '',
                search: '',
                allSelected: false,
            };
        },
        watch: {
            search: function (val) {
                this.usersList = this.usersListOriginal.filter(user => user.username.toLowerCase().includes(val.toLowerCase(),0) || user.email.toLowerCase().includes(val.toLowerCase(),0))
            },
            selected: function () {
                this.allSelected = this.selected.length !== 0;
            },
        },
        methods: {
            usersData(users) {
                this.usersListOriginal = users;
                this.usersList = users;
            },
            sortByName() {
                this.usersList.sort(function (a,b) {
                    let userA = a,
                        userB = b;
                    if (userA.name < userB.name) return -1;
                    if (userA.name > userB.name) return 1;
                    return 0;
                });
                this.usersList.reverse();
            },
            checkAll() {
                this.allSelected = !this.allSelected;

                if (this.allSelected) {
                    for (const user in this.usersListOriginal) {
                        this.selected.push(this.usersList[user].userId.toString());
                    }
                } else {
                    this.selected = [];
                }
            },
            sendMail() {
                let selectedEmails = [];
                for (const userIndex in this.selected) {
                    selectedEmails.push(this.usersList[userIndex].email)
                }
                window.location.href = 'mailto:' + selectedEmails.join(',')
            },
            deleteUsers() {
                let deleteSuccess = true;
                for (let i = 0; i < this.selected.length; i++) {
                    const id = this.selected[i];
                    AXIOS.get('/api/users/delete/' + id, {
                        headers: {
                            Authorization: this.$store.state.loggedInToken,
                            'Content-Type': 'application/json',
                        },
                    })
                        .catch(error => {
                            deleteSuccess = false;
                            console.log(error); //eslint-disable-line
                            this.$notify({
                                group: 'foo',
                                type: 'error',
                                title: 'Teavitus',
                                text: 'Midagi läks valesti. Proovi mõne aja pärast uuesti. (userId: ' + id + ')'
                            });
                        });
                }
                if (deleteSuccess) {
                    this.$notify({
                        group: 'foo',
                        title: 'Teavitus',
                        text: 'Kasutajate kustutamine oli edukas.'
                    });
                }
            }
        },
        mounted() {
            AXIOS.get('/api/users/list', {
                headers: {
                    Authorization: this.$store.state.loggedInToken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
                })
                .then(response => {
                    // JSON responses are automatically parsed.
                    const users = response.data;
                    this.usersData(users);
                })
                .catch(error => {
                    //eslint-disable-next-line
                    console.log(error)
                });
        },
    }
</script>

<style scoped>
    #userListContainer {
        text-align: left;
    }

    .usersTableContainer {
        text-align: left;
        width: auto;
    }

    .selectionBtn {
        width: 8em;
    }

    .selectionTableCell {
        text-align: right;
    }

    .tableDiv {
        overflow-x: scroll;
    }
</style>
