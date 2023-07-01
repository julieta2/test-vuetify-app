<template>
  <v-container>
    <v-form
        ref="form"
        lazy-validation
    >
      <v-text-field
          v-model="fullName"
          :error-messages="fullNameErrors"
          label="Full Name"
          rounded
          filled
          required
          @input="$v.fullName.$touch()"
          @blur="$v.fullName.$touch()"
      ></v-text-field>

      <v-autocomplete
          v-model="country"
          :items="countries"
          :error-messages="countryErrors"
          item-text="name"
          @change="(event) => changeCountry(event)"
          label="Country"
          filled
          rounded
          required
          @input="$v.country.$touch()"
          @blur="$v.country.$touch()"
      >
        <template v-slot:item="slotProps" >
          <v-icon class="flag-icon">{{slotProps.item.flag}}</v-icon>
          <v-icon :class="`flag-icon flag-icon-${slotProps.item.flag}`"></v-icon>
          {{slotProps.item.name}}
        </template>
      </v-autocomplete>

      <v-text-field
          v-model="phoneNumber"
          :error-messages="phoneNumberErrors"
          @input="formatPhoneNumber"
          :rules="phoneRules"
          maxlength="17"
          label="Phone Number"
          filled
          rounded
          required
      ></v-text-field>

      <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Email"
          filled
          rounded
          required
      ></v-text-field>

      <v-btn
          color="success"
          class="mr-4"
          @click="register"
      >
        Register
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import countries from '../assets/countries.json';
import { registerUser } from '../services/UserService';

export default {
  name: 'RegisterComponent',
  mixins: [validationMixin],

  validations: {
    fullName: { required, maxLength: maxLength(10) },
    country: { required },
    phoneNumber: { required },
    email: { required, email },
  },

  data: () => ({
    fullName: '',
    country: [], //TODO
    phoneNumber: '',
    email: '',
    countries: countries,
    phoneRules: [
      v => /^\(\d{2}\)\s\d{3}-\d{3}$/.test(v) || 'Phone number must be in the format +123 44 456-78-90'
    ]
  }),

  computed: {
    fullNameErrors () {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      !this.$v.fullName.maxLength && errors.push('Full Name must be at most 10 characters long')
      !this.$v.fullName.required && errors.push('Full Name is required.')
      return errors
    },
    countryErrors () {
      const errors = []
      if (!this.$v.country.$dirty) return errors
      !this.$v.country.required && errors.push('Country is required')
      return errors
    },
    phoneNumberErrors () {
      const errors = []
      if (!this.$v.phoneNumber.$dirty) return errors
      !this.$v.phoneNumber.required && errors.push('Phone Number is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid email')
      !this.$v.email.required && errors.push('Email is required')
      return errors
    },
  },

  methods: {
    register () {
      this.$v.$touch();
      console.log('this.country', this.country);
      const data = {
        fullName: this.fullName,
        country: this.country.n,
        phoneNumber: this.phoneNumber,
        email: this.email,
      };
      registerUser(data).then(response => {
        console.log(response);
      }).catch(e=> {
        console.log(e);
      });
    },
    changeCountry(event) {
      console.log('changeCountry', event);
      const selectedCountry = this.countries.find(({ name }) => name === event);
      console.log('selectedCountry', selectedCountry);
      this.phoneNumber = selectedCountry.idd
    },
    formatPhoneNumber() {
      // Remove all non-digit characters from the input value
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '');

      if (this.phoneNumber.length > 0) {
        this.phoneNumber = `+${this.phoneNumber.slice(0, 3)} ${this.phoneNumber.slice(3, 5)} ${this.phoneNumber.slice(5,8)}-${this.phoneNumber.slice(8,10)}-${this.phoneNumber.slice(10,12)}`;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.flag-icon {
  font-size: 24px;
}
.v-input__slot {
  background-color: white!important; /* Replace with your desired background color */
}
</style>
