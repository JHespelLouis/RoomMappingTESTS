from tkinter import *
from tkinter.ttk import *


class ExampleTab:
    def __init__(self, tabControl):
        self.tab = Frame(tabControl)
        self.label = Label(self.tab, text="This is an example tab").pack()

        tabControl.add(self.tab, text="Example Tab")



