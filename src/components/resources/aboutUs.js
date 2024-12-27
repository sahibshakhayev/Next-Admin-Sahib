import * as React from 'react';
import {
    List,
    Datagrid,
    Edit,
    EditButton,
    SimpleForm,
    TextInput,
    ImageInput,
    TextField,
    ImageField,
} from 'react-admin';







// The Edit component for managing About Us
export const AboutUsEdit = (props) => (
    <Edit {...props} title="Edit About Us">
        <SimpleForm>
            {/* Basic About Us information */}
            <TextInput source="header_text" label="Header Text" fullWidth />
            <TextInput source="short_description"  multiline label="Short Description" fullWidth multiline/>
            <TextInput source="long_description"   multiline label="Long Description" fullWidth multiline />
            <TextInput source="image_alt" label="Image Alt Text" />
            <ImageField source="left_image"/>
            <ImageInput source="left_image" label="Upload Image" accept="image/*">
                <ImageField source="src" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const AboutUsList = (props) => (
    <List {...props} pagination={false} perPage={1} title="About Us">
        <Datagrid>
            <TextField source="header_text" label="Header Text" />
            <TextField source="short_description" label="Short Description" />
            <EditButton />
        </Datagrid>
    </List>
);
