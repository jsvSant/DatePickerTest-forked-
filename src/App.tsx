import { useForm, Controller, Control } from "react-hook-form";
import "./App.css";
import { useState } from "react";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";

interface RHFDatePickerProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
}
function RHFDatePicker({ control, name, placeholder }: RHFDatePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Field required" }}
      render={({ field, fieldState }) => {
        return (
          <>
            <DatePicker
              format={"DD/MM/YYYY"}
              placeholder={placeholder}
              status={fieldState.error ? "error" : undefined}
              selectsRange={true}
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date: string) => {
                field.onChange(date ? date.valueOf() : null);
              }}
            />
            <br />
            {fieldState.error ? <span>{fieldState.error.message}</span> : null}
          </>
        );
      }}
    />
  );
}

function App() {
  const { handleSubmit, control, watch } = useForm<{
    dataInicio: string;
    dataFim: string;
  }>({});

  return (
    <form
      onSubmit={handleSubmit((data) => {
         data.dataInicio = dayjs(data.dataInicio).format("DD/MM/YYYY");
         data.dataFim = dayjs(data.dataFim).format("DD/MM/YYYY");
        console.log("return data:", data);
      })}
    >
      <div>
        <span>{JSON.stringify(watch("dataInicio"))}</span>
        <br />
        <p>data inicio</p>
        <RHFDatePicker
          control={control}
          name="dataInicio"
          placeholder="data inicio"
        />
        <p>data fim</p>
        <RHFDatePicker
          control={control}
          name="dataFim"
          placeholder="data fim"
        />
      </div>
      <button>Submit</button>
    </form>
  );
}

export default App;
