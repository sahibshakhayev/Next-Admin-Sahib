import React from 'react';
import { List, Datagrid,TextField, EditButton, DeleteButton, Edit, Create, SimpleForm, TextInput, ImageField, ImageInput } from 'react-admin';





export const ContactingList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="mail" />
            <ImageField source="src" />
            <EditButton basePath="/contactings" />
            <DeleteButton basePath="/contactings" />
        </Datagrid>
    </List>
);

// Edit component for Contacting
export const ContactingEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="mail" />
            <ImageInput source="image" accept="image/*">
                <ImageField source="src" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

// Create component for Contacting
export const ContactingCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"  required/>
            <TextInput source="mail" required />
            <ImageInput source="image" accept="image/*" required>
                <ImageField source="src" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
