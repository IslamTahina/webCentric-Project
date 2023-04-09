<template>
  <main data-app>
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="id"
      class="elevation-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Student Records</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:no-data> No Students found </template>
    </v-data-table>
  </main>
</template>
<script>
export default {
  data: () => ({
    students: [],
    headers: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "First Name",
        value: "firstName",
      },
      {
        text: "Last Name",
        value: "lastName",
      },
      {
        text: "Age",
        value: "age",
      },
      {
        text: "City",
        value: "city",
      },
      {
        text: "Email",
        value: "email",
      },
    ],
  }),

  async mounted() {
    // call API for all students
    try {
      const req = await fetch("http://localhost:5454/students");
      const json = await req.json();
      this.students = json;
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
