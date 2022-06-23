import { useState } from 'react'

import Nav from '../components/Nav'

const Onboarding = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    fname: "",
    lname: "",
    dob: "",
    show_gender: "",
    gender_identity: "",
    property_type: "",
    email: "",
    url: "",
    about: "",
    matches: []
  })

  const handleChange = (e) => {
    console.log('e', e);
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name
    console.log(value, name)

    setFormData((prevState) => ({
      ...prevState, [name]: value
    }))
  }

  console.log(formData)
  const handleSubmit = () => {
    console.log('submit');
  }
  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => { }}
        showModal={false}
      />

      <div className="onboarding">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              name="fname"
              required={true}
              placeholder="First name"
              value={formData.fname}
              onChange={handleChange}
            />
            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              id="lname"
              name="lname"
              required={true}
              placeholder="Last name"
              value={formData.lname}
              onChange={handleChange}
            />

            <label>DOB</label>
            <input
              type="date"
              id="dob"
              name="dob"
              required={true}
              value={formData.dob}
              onChange={handleChange}
            />

            <label htmlFor="gender">Gender</label>
            <div className="input-container">
              <input
                type="radio"
                id="female_gender_identity"
                name="gender_identity"
                placeholder="Female"
                value={"female"}
                onChange={handleChange}
                checked={formData.gender_identity === 'female'}
              />
              <label htmlFor="female_gender_identity">Female</label>

              <input
                type="radio"
                id="male_gender_identity"
                name="gender_identity"
                placeholder="Male"
                value={"male"}
                onChange={handleChange}
                checked={formData.gender_identity === 'male'}
              />
              <label htmlFor="male_gender_identity">Male</label>

              <input
                type="radio"
                id="other_gender_identity"
                name="gender_identity"
                placeholder="Other"
                value={"other"}
                onChange={handleChange}
                checked={formData.gender_identity === 'other'}
              />
              <label htmlFor="other_gender_identity">Other</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
              type="checkbox"
              id="show_gender"
              name="show_gender"
              placeholder=""
              value={""}
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Properties</label>
            <div className="input-container">
              <input
                type="radio"
                id="to_buy"
                name="property_type"
                value="to_buy"
                onChange={handleChange}
                checked={formData.property_type === 'to_buy'}
              />
              <label htmlFor="to_buy">To Buy</label>
              <input
                type="radio"
                id="for_rent"
                name="property_type"
                value="for_rent"
                onChange={handleChange}
                checked={formData.property_type === 'for_rent'}
              />
              <label htmlFor="for_rent">For Rent</label>
              <input
                type="radio"
                id="for_rent_and_buy"
                name="property_type"
                value="for_rent_and_buy"
                onChange={handleChange}
                checked={formData.property_type === 'for_rent_and_buy'}
              />
              <label htmlFor="for_rent_and_buy">Both</label>
            </div>

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              name="about"
              required="true"
              value={formData.about}
              placeholder="I'm a sophmore at NYU looking for my first apartment."
              onChange={handleChange}
              type="text"
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="about">Profile photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required="true"
            />

            <div className="photo-container">
              <img src={formData.url} alt="Profile pic preview" />
            </div>
          </section>
        </form>
      </div>

    </>
  )
}

export default Onboarding