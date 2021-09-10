# JW Fill Publisher Cards

- This is a quick solution that relies on `pdftk` to fill in the publisher card automatically.
- You will want to download the Publisher Card template from JW.org, name it `PublisherCard.es.pdf` and place it in this directory.

## Filling The Form

First make sure that you have already installed `pdftk` and then run the following:
```bash
npm run fill-fields
```

## Filling The Form Using the Legacy Python Script

First make sure that you have already installed `pdftk` and then run the following:
```bash
npm run fill-fields-py
```

## Dumping Field Names Into A File

```bash
npm run dump-fields
```

### Generating An FDF Template

```bash
npm run generate-fdf
```

## Getting the FDF Field Names Visually

- Go to https://www.pdfescape.com/open/
- Upload the PDF that has the fields to be filled out.
- Right click on a field and select "Unlock Form Field".
- When asked if you are sure click "Yes".
- Right click on the same field which should now appear in a different color and select "Object properties...".
- The name of the field will be listed as "Name" in the list of properties.

# Formulas Are Not Automatically Calculated

Since formulas (such as the total lines) are not automatically recalculated you will have to change and field and then put it back manually to actually see all of the calculations be handled correctly.

# Resources

- https://talkingpdf.org/forms-data-format-fdf/
- https://www.pdfescape.com/open/
