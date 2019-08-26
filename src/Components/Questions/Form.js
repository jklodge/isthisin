import React from 'react';


const Form = (props) => {

  return (
    <main>
    <form className="form" onSubmit={props.submit}>
      <div className="field">
      <label className="label">Question</label>
      <div className="control">
        <input className="input" name="title" type="text" 
        onChange={props.handleChange}
        value={props.data.title}
        placeholder="Do people still rock these?" required/>
      </div>
      </div>

      <div className="field">
        <label className="label">Image</label>
        <div className="control">
          {/* <img className="imgPreview newimgPrview" src="" alt="" style="background-image"/> */}
          <input type="hidden" name="image" 
          value={props.data.image}
          onChange={props.handleChange}
          required />
          <button className="button image-upload" type="button">Choose an image to upload</button>
        </div>
      </div>

      <div className="field">
      <label className="label">Give us more! Is it for a first date, interview, meet the parents etc?</label>
      <div className="control">
        <input className="input" name="moreinfo" 
        value={props.data.moreinfo}
        onChange={props.handleChange}
        type="text" placeholder="First date outfit" required />
      </div>
    </div>
     
      <div className="field">
      <label className="label">Where did you get it from?</label> 
      <div className="control">
        <input className="input" name="from" 
        value={props.data.from}
        onChange={props.handleChange}
        type="text" placeholder="Optional" required />
      </div>
    </div>

    <div className="control">
      <button onClick={props.toggle} className="button is-primary">Submit</button>
    </div>

       
    </form>
    </main>
  );
};

export default Form;