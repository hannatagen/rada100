<template>
    <div id="userListContainer">
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Adminite haldus</span>
        </nav>
        <nav v-if="!addAdmin"
                class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button id="sendMailBtn"
                    v-b-tooltip.hover
                    @click="sendMail"
                    :disabled="!allSelected"
                    class="navbarBtn btn btn-primary"
                    title="Saada valitud kasutajatele email."
                    mailto="selectedEmails">Saada kiri</button>
            <button v-b-tooltip.hover
                    @click="[trailsListBtnClicked = false, addTrailBtnClicked = true]"
                    :disabled="!allSelected"
                    class="navbarBtn btn btn-danger"
                    title="Kustuta valitud kasutajad.">Kustuta</button>
            <button v-b-tooltip.hover
                    @click="addAdmin = true"
                    class="navbarBtn btn btn-dark"
                    title="Lisa uus admin kasutaja.">Lisa admin</button>
        </nav>
        <nav    v-else
                class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button @click="addAdmin = false"
                    class="navbarBtn btn btn-danger">Katkesta</button>
        </nav>
        <nav    v-if="selectionHasChanged && !addAdmin"
                class="adminNavbar navbar navbar-expand-lg navbar-light">
            <button v-b-tooltip.hover
                    @click="saveChanges"
                    title="Salvesta rollide muudatused."
                    class="navbarBtn btn btnGreen">Salvesta</button>
            <button v-b-tooltip.hover
                    @click="cancelChanges"
                    title="Tühista rollide muudatused."
                    class="navbarBtn btn btn-danger">Tühista</button>
        </nav>
        <br v-if="!addAdmin">
        <div    v-if="!addAdmin"
                class="usersTableContainer container">
            <input v-model="search" class="form-control" placeholder="Otsi...">
            <div class="tableDiv">
                <table  class="adminTable table table-hover sortable">
                    <thead id="userTableHead">
                    <tr>
                        <th>ID</th>
                        <th>
                            <a class="tableColumnTitle" href="#" @click="sortByName">
                                Nimi
                                <i class="fas fa-arrows-alt-v"></i>
                            </a>
                        </th>
                        <th>
                            <a class="tableColumnTitle" href="#" @click="sortByRole">
                                Roll
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
                        <td>
                            <select @change="selectionHasChanged = true"
                                    v-model="user.role"
                                    :key="user.role"
                                    class="form-control selectDropDown"
                                    aria-label="Role">
                                <option value="ADMIN">
                                    ADMIN
                                </option>
                                <option value="SUPERADMIN">
                                    SUPERADMIN
                                </option>
                            </select>
                        </td>
                        <td>{{ user.email }}</td>
                        <td class="selectionTableCell">
                            <input  v-model="selected"
                                    :value="user.role"
                                    aria-label="Select"
                                    type="checkbox"
                                    id="customCheck1">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <AddAdmin v-else></AddAdmin>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'
    import AddAdmin from './AddAdmin';

    export default {
        name: "AdminManagement",
        components: {
            AddAdmin
        },
        data() {
            return {
                usersListOriginal: [],
                usersList: [],
                selectionHasChanged: false,
                sortKey: '',
                search: '',
                allSelected: false,
                selected: [],
                addAdmin: false
            };
        },
        watch: {
            search: function (val) {
                this.usersList = this.usersListOriginal.filter(user => user.username.toLowerCase().includes(val.toLowerCase(),0) || user.role.toLowerCase().includes(val.toLowerCase(),0) || user.email.toLowerCase().includes(val.toLowerCase(),0))
            },
            selected: function () {
                this.allSelected = this.selected.length !== 0;
            },
        },
        methods: {
            saveChanges() {
                this.selectionHasChanged = false;
            },
            cancelChanges() {
                // this.usersList = this.usersListOriginal;
                this.selectionHasChanged = false;
            },
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
            sortByRole() {
                this.usersList.sort(function (a,b) {
                    let userA = a,
                        userB = b;
                    if (userA.role < userB.role) return -1;
                    if (userA.role > userB.role) return 1;
                    return 0;
                });
                this.usersList.reverse();
            },
            checkAll() {
                this.allSelected = !this.allSelected;

                if (this.allSelected) {
                    for (let userIndex in this.usersListOriginal) {
                        this.selected.push(userIndex);
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
            }
        },
        mounted() {
            AXIOS.get('/api/admin/users/list', {
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
        width: 7em;
    }

    .selectionTableCell {
        text-align: right;
    }

    .tableDiv {
        overflow-x: scroll;
    }

    .selectDropDown {
        width: fit-content;
    }
</style>
