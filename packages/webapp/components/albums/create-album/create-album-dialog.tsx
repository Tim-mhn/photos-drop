import { object, string } from "yup";
import { Images } from "@shared";
import {
  Button,
  DialogTitle,
  DialogUI,
  ErrorMessageWrapper,
  Input,
} from "../../ui";
import { Form, Formik } from "formik";
import { useCreateAlbumMutation } from "../../../core/features/albums";

const newGroupSchema = object().shape({
  name: string().min(1).required(),
});
export const CreateAlbumDialog = ({
  closeDialog,
  open,
  selectedPhotos,
  onAlbumCreated,
}: {
  closeDialog: () => void;
  open: boolean;
  selectedPhotos: Images;
  onAlbumCreated?: () => void;
}) => {
  const [createAlbum] = useCreateAlbumMutation();

  return (
    <DialogUI
      close={closeDialog}
      open={open}
      title={
        <DialogTitle>
          <div className="flex flex-grow justify-center mt-2">Create album</div>
        </DialogTitle>
      }
    >
      <div className="px-4 pt-2 flex flex-col gap-3">
        <Formik
          initialValues={{ name: "" }}
          validationSchema={newGroupSchema}
          onSubmit={({ name }) => {
            console.log(name);
            createAlbum(name);
            closeDialog();
            onAlbumCreated?.();
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
  );
};
