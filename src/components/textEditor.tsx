import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface textEditorProps {
  onChange(e: any): void;
}

export default class TextEditor extends React.Component<textEditorProps> {
  render() {
    return (
      <Editor
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help"
        }}
        initialValue={`Ketikkan catatan di sini...`}
        onChange={this.props.onChange}
      />
    );
  }
}
