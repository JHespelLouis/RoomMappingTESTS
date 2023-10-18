from tkinter import *
from tkinter.ttk import *
from tabs.exampleTab import ExampleTab

root = Tk()

root.title("Interface opérateur")
width = root.winfo_screenwidth()
height = root.winfo_screenheight()
root.geometry("%dx%d" % (width, height))

tabControl = Notebook(root)
example = ExampleTab(tabControl)
tabControl.pack(expand=1, fill="both")

root.mainloop()
