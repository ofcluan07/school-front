<template>
  <q-page class="q-pa-lg">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs class="text-grey" active-color="blue-10">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="blue-10" />
        </template>

        <q-breadcrumbs-el label="Inicio" icon="home" :to="{ name: 'index' }" />
        <q-breadcrumbs-el label="Escola" icon="fab fa-wpforms" />
        <q-breadcrumbs-el
          label="Alunos"
          icon="fas fa-building"
          :to="{ name: 'students' }"
        />
      </q-breadcrumbs>
    </div>
    <q-card class="q-mt-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8" style="font-size: 18px">
          <i class="fas fa-grip-lines-vertical q-pl-md" style="color: #48d1cc"></i>
          Alunos
          <q-btn
            label="Adicionar Aluno"
            class="float-right text-capitalize shadow-3"
            icon="person"
            color="blue-10"
            @click="clearForm(), (ModalStudent = true), (Creating = true)"
          />

          <q-dialog v-model="ModalStudent">
            <q-card style="width: 500px; max-width: 80vw">
              <q-card-section>
                <label class="text-h6" v-if="Editing"> Editar Aluno </label>
                <label class="text-h6" v-if="Creating"> Cadastrar Aluno </label>
              </q-card-section>

              <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
                <q-card class="card-bg text-blue-10">
                  <q-card-section class="q-pa-sm">
                    <q-form ref="myForm">
                      <q-list class="row">
                        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-input
                              color="blue-10"
                              outlined
                              v-model="StudentDetails.Name"
                              label="Nome"
                              :rules="[required, minLength(5)]"
                            />
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-input
                              @input="
                                (val) => {
                                  StudentDetails.NameMother = val.toUpperCase();
                                }
                              "
                              outlined
                              label="Nome da mãe"
                              color="blue-10"
                              v-model="StudentDetails.NameMother"
                              :rules="[required, minLength(11)]"
                            >
                            </q-input>
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-input
                              @input="
                                (val) => {
                                  StudentDetails.NameFather = val.toUpperCase();
                                }
                              "
                              outlined
                              label="Nome do pai"
                              color="blue-10"
                              v-model="StudentDetails.NameFather"
                              :rules="[required, minLength(11)]"
                            >
                            </q-input>
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-input
                              outlined
                              label="Data de nascimento"
                              color="blue-10"
                              v-model="StudentDetails.DateBirth"
                              mask="##/##/####"
                              :rules="[dateValidate, required]"
                            >
                              <template v-slot:append>
                                <q-icon
                                  color="grey-8"
                                  name="event"
                                  class="cursor-pointer"
                                >
                                  <q-popup-proxy
                                    ref="qDateProxy"
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      v-model="StudentDetails.DateBirth"
                                      mask="DD/MM/YYYY"
                                    >
                                      <div class="row items-center justify-end">
                                        <q-btn
                                          v-close-popup
                                          label="Close"
                                          color="primary"
                                          flat
                                        />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-select
                              outlined
                              label="Sexo"
                              color="blue-10"
                              v-model="StudentDetails.Genery"
                              :options="Gender"
                              :rules="[required]"
                            >
                            </q-select>
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-select
                              outlined
                              color="blue-10"
                              label="Nacionalidade"
                              v-model="StudentDetails.Nationality"
                              :options="Nationality"
                              :rules="[required]"
                            >
                            </q-select>
                          </q-item-section>
                        </q-item>
                        <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <q-item-section>
                            <q-input
                              color="blue-10"
                              outlined
                              v-model="StudentDetails.School"
                              label="Escola"
                              :rules="[required, minLength(5)]"
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-form>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Fechar" v-close-popup />
                    <q-btn
                      class="bg-info text-white"
                      color="blue-10"
                      @click="registerStudent(), (Creating = true), (Editing = false)"
                      v-if="Creating"
                      >Cadastrar</q-btn
                    >

                    <q-btn
                      class="bg-info text-white"
                      color="blue-10"
                      @click="
                        updateStudent(StudentDetails),
                          (Creating = false),
                          (Editing = true)
                      "
                      v-if="Editing"
                      >Editar</q-btn
                    >
                  </q-card-actions>
                </q-card>
              </div>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-none">
        <q-table
          :data="Students"
          :columns="columns"
          :filter="filter"
          :pagination.sync="StatusOrderByDesc"
          row-key="id"
          no-results-label="Nenhum resultado foi encontrado."
          style="background: #f8f8f8"
        >
          <template v-slot:top-right>
            <q-input
              filled
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <q-btn
                icon="fas fa-edit"
                size="sm"
                flat
                dense
                @click="
                  clearForm(), openModalStudentEdit(props.row), (ModalStudent = true)
                "
              >
                <q-tooltip>Editar aluno</q-tooltip>
              </q-btn>
               <q-btn
                icon="fas fa-trash-alt"
                size="sm"
                flat
                dense
                @click="clearForm(), deleteStudent(props.row)"
              >
                <q-tooltip>Remover aluno</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {
  email,
  required,
  dateValidate,
  minLength,
  mascaraCpf,
  comparePasswords,
} from "src/utils/validations";
import {
  loadRouter,
  getDateNow,
  formatDate,
  formataStringDate,
  removeIconError
} from "src/utils/Utils";
import ServicesStudent from "src/services/students";

export default {
  name: "Students",
  data() {
    return {
      columns: [
        {
          name: "Id",
          label: "Id",
          field: "id",
          sortable: true,
          align: "left",
        },
        {
          name: "Nome",
          label: "Nome",
          field: "Name",
          sortable: true,
          align: "left",
        },
        {
          name: "Data Criação",
          label: "Data Criação",
          field: "DateCreated",
          sortable: true,
          align: "left",
          format: this.formatDate,
        },
        {
          name: "Data Aniversário",
          label: "Data Aniversário",
          field: "DateBirth",
          sortable: true,
          align: "left",
          format: this.formatDate,
        },
        {
          name: "Gênero",
          label: "Gênero",
          field: "Genery",
          sortable: true,
          align: "left",
        },
        {
          name: "Nacionalidade",
          label: "Nacionalidade",
          field: "Nationality",
          sortable: true,
          align: "left",
        },
        {
          name: "Nome Mãe",
          label: "Nome Mãe",
          field: "NameMother",
          sortable: true,
          align: "left",
        },
        {
          name: "Nome Pai",
          label: "Nome Pai",
          field: "NameFather",
          sortable: true,
          align: "left",
        },
        {
          name: "Escola",
          label: "Escola",
          field: "School",
          sortable: true,
          align: "left",
        },
        {
          name: "Action",
          label: "",
          field: "Action",
          sortable: false,
          align: "center",
        },
      ],
      StatusOrderByDesc: {
        sortBy: "Status",
        descending: true,
        rowsPerPage: 10,
      },
      Students: [],
      StudentDetails: [],
      ModalStudent: false,
      Editing: false,
      Creating: false,
      filter: "",
      Gender: ["Masculino", "Feminino"],
      Nationality: ["Brasileiro(a)", "Outros"],
    };
  },
  methods: {
    required,
    minLength,
    dateValidate,
    getDateNow, //Pega a data/hora atual
    formataStringDate,
    formatDate,
    getStudent: async function () {
      var self = this;
      await ServicesStudent.listStudents()
        .then(function (response) {
          debugger;
          self.Students = response.data;
        })
        .catch(function () {
          //self.notifyFailed("Não foi possível carregar os convênios.");
        });
    },
    clearForm() {
      var self = this;
      self.StudentDetails = [];
      self.ModalStudent = false;
      self.Editing = false;
      self.Creating = false;
    },
    registerStudent() {
      this.$refs.myForm.validate().then((success) => {
        if (!success) {
          this.formHasError = true;
          return;
        }

        var self = this;

        var student = {
          Name: self.StudentDetails.Name,
          DateCreated: self.getDateNow(),
          DateBirth: self.formataStringDate(self.StudentDetails.DateBirth),
          Genery: self.StudentDetails.Genery,
          Nationality: self.StudentDetails.Nationality,
          NameMother: self.StudentDetails.NameMother,
          NameFather: self.StudentDetails.NameFather,
          School: self.StudentDetails.School,
        };

        ServicesStudent.createStudents(student)
          .then((response) => {
            debugger;
           // self.notifySuccess("Aluno cadastrado com sucesso");
            self.getStudent();
            self.clearForm();
          })
          .catch(function (error) {
            debugger;
            //self.notifyFailed(error.response.data.message);
          });
      });
    },
    updateStudent(student) {
      var self = this;

      var studentUpdate = {
          Id: student.Id,
          Name: student.Name,
          DateCreated: student.DateCreated,
          DateBirth: self.formataStringDate(student.DateBirth),
          Genery: student.Genery,
          Nationality: student.Nationality,
          NameMother: student.NameMother,
          NameFather: student.NameFather,
          School: student.School,
        };

      ServicesStudent.editStudents(studentUpdate)
        .then(function (response) {
         // self.notifySuccess("Filial alterado com sucesso");
          self.getStudent();
          self.clearForm();
        })
        .catch(function (error) {
         // self.notifyFailed(error.response.data.message);
        });
    },
    deleteStudent(student) {
      debugger;
      var self = this;

      ServicesStudent.deleteStudents(student.Id)
        .then(function (response) {
         // self.notifySuccess("Filial alterado com sucesso");
          self.getStudent();
          self.clearForm();
        })
        .catch(function (error) {
         // self.notifyFailed(error.response.data.message);
        });
    },
    openModalStudentEdit(affiliated) {
      var self = this;
      self.clearForm();
      
      self.StudentDetails = Object.assign({}, affiliated);
      self.StudentDetails.DateBirth = self.formatDate(self.StudentDetails.DateBirth);
      debugger;
      self.Editing = true;
    },
  },
  mounted() {
    var self = this;
    self.getStudent();
  },
};
</script>

<style></style>
