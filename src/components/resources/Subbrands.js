import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    ImageField,
    EditButton,
    DeleteButton,
    Pagination,
    Edit,
    SimpleForm,
    TextInput,
    ImageInput,
    Create, ReferenceInput,
} from 'react-admin';





// List component for displaying blogs
export const SubbrandsList = (props) => (
    <List {...props} pagination={<Pagination />} title="Subbrands" perPage={10}>
        <Datagrid rowClick="edit">
            <TextField source="logo_alt" label="Logo Alt" />
            <ImageField source="logo" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// Edit component for editing a blog
export const SubbrandEdit = (props) => (
    <Edit {...props} title="Edit Subbrand">
        <SimpleForm>
            <TextInput source="logo_alt" label="Logo alt" fullWidth />
            {/* Adjust ImageField to include the full URL */}
            <ImageField  source="logo"/>
            <ImageInput source="logo" label="New Logo" accept=".jpg,.png,.jpeg">
                <ImageField  source="logo"/>
            </ImageInput>

        </SimpleForm>
    </Edit>
);

// Create component for creating a new blog
export const SubbrandCreate = (props) => (
    <Create {...props} title="Create Subbrand">
        <SimpleForm>
            <TextInput source="logo_alt" label="Logo Alt" fullWidth  required/>
            <ReferenceInput source='about_us_id' label="About Us Id" reference="about-us" required/>
            {/* Image upload for new blog */}
            <ImageInput source="logo" label="Subbrand logo" accept=".jpg,.png,.jpeg" required>
                <ImageField source="logo" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
