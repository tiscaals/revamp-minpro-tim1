import React, { useState } from 'react';

const DynamicInputSection = () => {
  const [inputs, setInputs] = useState<any>([
    { title: '', subtitle: '', image: null },
  ]);

  console.log(inputs);

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    if (name === 'image') {
      const image = files[0];
      const newInputs = [...inputs];
      newInputs[index].image = image;
      setInputs(newInputs);
    } else {
      const newInputs = [...inputs];
      newInputs[index][name] = value;
      setInputs(newInputs);
    }
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, { title: '', image: null }];
    setInputs(newInputs);
  };

  const handleRemoveInput = index => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Buat instance FormData
    const formData = new FormData();

    // Loop melalui setiap input untuk mengisi FormData
    inputs.forEach((input, index) => {
      formData.append(`title[${index}]`, input.title);
      formData.append(`image[${index}]`, input.image);
    });

    // Lakukan permintaan HTTP menggunakan FormData
    // Misalnya, gunakan fetch atau axios untuk mengirim FormData ke backend
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Lakukan sesuatu dengan respons dari backend
    // })
    // .catch(error => {
    //   // Tangani error
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div key={index}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={event => handleInputChange(index, event)}
            />
          </label>
          <label>
            Subtitle:
            <input
              type="text"
              name="subtitle"
              value={input.subtitle}
              onChange={event => handleInputChange(index, event)}
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={event => handleInputChange(index, event)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveInput(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddInput}>
        Add Input
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicInputSection;
