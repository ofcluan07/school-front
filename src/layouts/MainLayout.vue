<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header_normal">
      <q-toolbar style="min-height: 60px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          class="q-mr-sm"
        />
        <q-toolbar-title>School - 4POA</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      class="text-white teste"
      :width="300"
      :breakpoint="500"
      :mini-width="90"
      bordered
    >
      <div style="height: calc(100% - 117px); padding: 10px">
        <q-img
          v-show="!miniState"
          src="https://vidadeprogramador.com.br/uploads/2019/01/tirinha1953-fb.jpg"
          style="height: 15%"
        >
        </q-img>
        <q-item class="navigation-item" v-show="miniState">
          <q-item-section avatar>
            <q-icon
              size="lg"
              name="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
            ></q-icon>
          </q-item-section>
        </q-item>

        <hr />

        <q-scroll-area style="height: 90%">
          <q-list padding>
            <q-item
              :to="{ name: 'index' }"
              active-class="tab-active"
              class="q-mb-sm q-mt-sm navigation-item"
              clickable
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="dashboard"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Dashboard</q-item-label>
              </q-item-section>
            </q-item>

             <q-expansion-item
              icon="fab fa-wpforms"
              label="Escola"
            >
              

              <q-item
                :to="{ name: 'students' }"
                active-class="tab-active"
                class="q-ma-sm navigation-item"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon name="fas fa-address-card"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Cadastro alunos</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              
              <router-view/>
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      miniState: true,
    };
  },
};
</script>

<style>
.q-drawer {
  /* background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important; */
  background-color: #2c2c2c !important;
  background-size: cover !important;
}
.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}
.drawer_dark {
  background-color: #010101f2;
}
.navigation-item {
  border-radius: 30px;
  color: #fff;
}

.tab-active {
  background-color: white;
  color: #0d47a1;
}
body {
  background: #f1f1f1 !important;
}
.header_normal {
  background: linear-gradient(90deg, #0c2646 0, #204065 60%, #2a5788);
}
.header_dark {
  background: linear-gradient(90deg, #0c2646 0, #204065 60%, #2a5788);
}
</style>

