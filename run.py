#!/usr/bin/env python
from fdfgen import forge_fdf
from pathlib import Path

service_months = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August"]

fields = {
  "Name": "Jhovana Gutiérrez",
  "Date of birth": "Fecha de nacimiento (programa)",
  "Date immersed": "Fecha de bautismo (programa)",

  "Check Box1": True, # Man
  "Check Box2": True, # Female
  "Check Box3": True, # Other Sheep
  "Check Box4": True, # Anointed
  "Check Box5": True, # Elder
  "Check Box6": True, # Ministerial Servant
  "Check Box7": True, # Regular Pioneer
}

first_year = 2025
for year_index in range(2):
  year_num = year_index + 1
  year_num_underscore = "_2" if year_num == 2 else ""
  fields[f"Service Year{year_num_underscore}"] = first_year + year_index
  for service_month_index in range(12):
    service_month = service_months[service_month_index]
    service_month_num = service_month_index + 1
    fields[f"{year_num}-Place_{service_month_num}"] = year_index * 60 + service_month_index * 5 + 1
    fields[f"{year_num}-Video_{service_month_num}"] = year_index * 60 + service_month_index * 5 + 2
    fields[f"{year_num}-Hours_{service_month_num}"] = year_index * 60 + service_month_index * 5 + 3
    fields[f"{year_num}-RV_{service_month_num}"] = year_index * 60 + service_month_index * 5 + 4
    fields[f"{year_num}-Studies_{service_month_num}"] = year_index * 60 + service_month_index * 5 + 5
    fields[f"Remarks{service_months[service_month_index]}{year_num_underscore}"] = f"Notas para {service_months[service_month_index]} de {first_year + year_index}"

fdf = forge_fdf("",[*fields.items()],[],[],[])

Path("PublisherCard.es.fdf").write_bytes(fdf)
