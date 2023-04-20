"use client";
import { useState } from "react";
import { Button, DialogTitle, DialogUI, ErrorMessageWrapper } from "../shared";
import { Form, Formik } from "formik";
import { Input } from "../shared/input";
import { object, string } from "yup";
import { useAlbumsStore } from "../../core/albums";

const newGroupSchema = object().shape({
  name: string().min(1).required(),
});
export const CreateAlbumButton = () => {
  const albumsStore = useAlbumsStore();

  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  return (
    <>
      <Button style="simple" size="sm" onClick={openDialog}>
        Create album
      </Button>

      <DialogUI
        close={closeDialog}
        open={open}
        title={
          <DialogTitle>
            <div className="flex flex-grow justify-center mt-2">
              Create album
            </div>
          </DialogTitle>
        }
      >
        <div className="px-4 pt-2 flex flex-col gap-3">
          <Formik
            initialValues={{ name: "" }}
            validationSchema={newGroupSchema}
            onSubmit={({ name }) => {
              albumsStore.createAlbum(name);
              closeDialog();
            }}
          >
            {({ values, handleChange, handleBlur, isValid }) => (
              <Form>
                <div className="flex flex-col gap-3">
                  <div>
                    <Input
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ErrorMessageWrapper name="name" />
                  </div>

                  <div className="flex flex-grow justify-end">
                    <Button type="submit" disabled={!isValid}>
                      Create
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogUI>
    </>
  );
};