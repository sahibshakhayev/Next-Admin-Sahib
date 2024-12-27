import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, Create, SimpleForm, TextInput, ImageField, ImageInput } from 'react-admin';

// List component for Partner

export const PartnerList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="alt_text" label="Alt Text" />
            <TextField source="website_link" label="Website Link" />
            <ImageField source="logo_src" />
            <EditButton basePath="/partners" />
            <DeleteButton basePath="/partners" />
        </Datagrid>
    </List>
);

// Edit component for Partner
export const PartnerEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="alt_text" label="Alt Text" />
            <TextInput source="website_link" label="Website Link" />
            <ImageInput source="logo" label="Logo" accept="image/*">
                <ImageField source="logo_src" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

// Create component for Partner
export const PartnerCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="alt_text" label="Alt Text" />
            <TextInput source="website_link" label="Website Link"  />
            <ImageInput source="logo" label="Logo" accept="image/*" required>
                <ImageField source="logo_src" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
