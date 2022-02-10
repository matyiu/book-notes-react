import { useFormik } from 'formik'
import React from 'react'
import {
    InputGroup,
    InputText,
    Label,
    Input,
    ErrorMessage,
    Textarea,
    ButtonGroup,
} from '../components/elements/Form'
import { Navbar } from '../components/Navbar'
import { AuthBox } from '../layout/AuthBox'
import { Primary, LinkBtn } from '../components/elements/Button'
import { useSelector } from 'react-redux'
import { removeWhitespace } from '../utils/string'

const validate = (form) => {
    const errors = {}

    if (removeWhitespace(form.username).length === 0) {
        errors.username = 'Username is required'
    } else if (/\s+/g.test(form.username)) {
        errors.username = 'Whitespaces are not allowed on the username field'
    }

    if (removeWhitespace(form.name).length === 0) {
        errors.name = 'Name is required'
    }

    if (removeWhitespace(form.email).length === 0) {
        errors.email = 'Email is required'
    }

    if (
        removeWhitespace(form.password).length > 0 &&
        form.password.length < 10
    ) {
        errors.password = 'The password must be greater than 10'
    }

    if (form.password !== form.confirm_password) {
        errors.confirm_password =
            'The password and the confirmation password do not match'
    }

    return errors
}

const Profile = () => {
    const user = useSelector((state) => state.auth.user)
    const formik = useFormik({
        initialValues: {
            username: user.username,
            email: user.email,
            name: user.name,
            about: user.description,
            password: '',
            confirm_password: '',
        },
        onSubmit: (values, { setStatus, setErrors }) => {
            console.log(values)
        },
        validate: validate,
    })

    return (
        <div id="profile">
            <Navbar />
            <AuthBox showBrand={false} header="Profile configuration">
                <form onSubmit={formik.handleSubmit} method="POST">
                    <InputGroup>
                        <Label>Username</Label>
                        <InputText
                            name="username"
                            id="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <ErrorMessage>{formik.errors.email}</ErrorMessage>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="about">About me</Label>
                        <Textarea
                            name="about"
                            id="about"
                            onChange={formik.handleChange}
                            value={formik.values.about}
                        ></Textarea>
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <ErrorMessage>{formik.errors.password}</ErrorMessage>
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="confirm_password">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            onChange={formik.handleChange}
                            value={formik.values.confirm_password}
                        />
                        <ErrorMessage>
                            {formik.errors.confirm_password}
                        </ErrorMessage>
                    </InputGroup>
                    <ErrorMessage>{formik.status}</ErrorMessage>
                    <ButtonGroup>
                        <Primary type="submit">Save profile</Primary>
                        <LinkBtn to="/">Return to notes</LinkBtn>
                    </ButtonGroup>
                </form>
            </AuthBox>
        </div>
    )
}

export default Profile
